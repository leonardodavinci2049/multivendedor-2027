import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import { createUser, deleteUser, getUserById, updateUser } from "@/services/db/user/use-service-clerk-db";
import { Role } from "@/types/tables-type";



export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }



  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");



  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  
  console.log("Webhook received:", body);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }


  // When user is created or updated
  if (evt.type === "user.created" || evt.type === "user.updated") {
    // Parse the incoming event data
    const data = JSON.parse(body).data;

    // Validate required fields
    if (!data.id || !data.email_addresses?.[0]?.email_address) {
      console.error("Invalid user data from Clerk webhook:", data);
      return new Response("Invalid user data", { status: 400 });
    }

    // Create a user object with relevant properties
    const firstName = data.first_name || "";
    const lastName = data.last_name || "";
    const fullName = `${firstName} ${lastName}`.trim() || "User";

    const userData = {
      name: fullName,
      email: data.email_addresses[0].email_address,
      picture: data.image_url || "",
      role: Role.USER, // Default role for new users
    };

    try {
      // Check if user already exists before creating
      const existingUser = await getUserById(data.id);

      if (existingUser) {
        // Update user in the database (preserve existing role)
        const dbUser = await updateUser(data.id, userData);

        if (!dbUser) {
          console.error(`User not found for update: ${data.id}`);
          return new Response("User not found", { status: 404 });
        }

        // Update user's metadata in Clerk with the current role information
        const client = await clerkClient();
        await client.users.updateUserMetadata(data.id, {
          privateMetadata: {
            role: dbUser.role || Role.USER,
          },
        });

        console.log(`User updated: ${dbUser.email} (${dbUser.id})`);
      } else {
        // Create user in the database
        const dbUser = await createUser(data.id, userData);

        // Update user's metadata in Clerk with the role information
        const client = await clerkClient();
        await client.users.updateUserMetadata(data.id, {
          privateMetadata: {
            role: dbUser.role || Role.USER,
          },
        });

        console.log(`User created: ${dbUser.email} (${dbUser.id})`);
      }
    } catch (error) {
      console.error("Error handling user creation/update:", error);
      return new Response("Error processing user", { status: 500 });
    }
  }

  // When user is deleted
  if (evt.type === "user.deleted") {
    try {
      // Parse the incoming event data to get the user ID
      const userId = evt.data.id;

      if (!userId) {
        console.error("No user ID provided for deletion");
        return new Response("No user ID provided", { status: 400 });
      }

      // Delete the user from the database based on the user ID
      const deleted = await deleteUser(userId);

      if (deleted) {
        console.log(`User deleted: ${userId}`);
      } else {
        console.warn(`User not found for deletion: ${userId}`);
      }
    } catch (error) {
      console.error("Error handling user deletion:", error);
      return new Response("Error deleting user", { status: 500 });
    }
  }




  return new Response("", { status: 200 });
}
