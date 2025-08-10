/* eslint-disable @typescript-eslint/no-unused-vars */
type Tbl_anuncios = {
  id_anuncio: number;
  id_merchant?: number;
  campanha?: string;
  oque?: string;
  porque?: string;
  quanto?: string;
  quando?: string;
  como?: string;
  quem?: string;
  url_destino?: string;
  url_afiliado?: string;
  url_encurtador01?: string;
  url_encurtador02?: string;
  hashtag?: string;
  path_image01?: string;
  path_image02?: string;
  path_image03?: string;
  cupons_desconto?: string;
  caracterisiticas?: string;
  avisos?: string;
  assinatura?: string;
  anotacoes?: string;
  dt_cadastro?: Date;
};

type Tbl_anuncios_key = {
  id_key: number;
  key?: string;
};

type Tbl_anuncios_meta = {
  meta_id: number;
  id_cadastro?: number;
  id_key?: number;
  meta_key?: string;
  meta_value?: string;
};

type Tbl_api_historico = {
  id_historico: number;
  ID_CATEGORIA_API?: bigint;
  ID_CATEGORIA_PARENT?: bigint;
  CATEGORY?: string;
  KEYWORDS?: string;
  MIN_SALE_PRICE?: number;
  MAX_SALE_PRICE?: number;
  SORT?: string;
  TOTAL_RECORD?: number;
  CURRENT_RECORD?: number;
  APP_KEY?: string;
  TRACKING_ID?: string;
  APP_SECRET?: string;
  NIVEL?: number;
  FLAG_ALL?: number;
  DT_UPDATE?: Date;
  DT_CADASTRO?: Date;
  INATIVO?: number;
};

type Tbl_api_historico_page = {
  ID_HISTORICO_PAGE: number;
  ID_HISTORICO?: number;
  CURRENT_PAGE?: number;
  FINAL_PAGE?: number;
  ADDED?: number;
  EXISTING?: number;
  DT_CADASTRO?: Date;
  DT_UPDATE?: Date;
};

type Tbl_atributo = {
  ID_ATRIBUTO: number;
  ATRIBUTO_ORIGEM?: string;
  ATRIBUTO_OTMZ?: string;
  QT_ATRIBUTOS_REL?: number;
  FLAG_LOOP?: number;
};

type Tbl_atributo_valor = {
  ID_ATRIBUTO_VALOR: number;
  VALOR_ORIGEM?: string;
  VALOR_OTMZ?: string;
};

type Tbl_busca_trans_end = {
  ID_BUSCA: number;
  ID_PROJETO?: number;
  ID_CATEGORIA?: bigint;
  TRANSACIONAL?: string;
  ID_TIPO?: number;
  DT_UPDATE_IMP?: Date;
};

type Tbl_busca_trans_start = {
  ID_BUSCA: number;
  ID_PROJETO?: number;
  ID_CATEGORIA?: bigint;
  TRANSACIONAL?: string;
  ID_TIPO?: number;
  DT_UPDATE_IMP?: Date;
};

type Tbl_categoria_aliexpress = {
  ID_CATEGORIA: bigint;
  ID_MERCHANT?: number;
  TERM_ID?: number;
  ID_IDIOMA?: number;
  ID_CAT_VITRINE?: number;
  ID_CAT_METADADO?: number;
  ID_CAT_CIDADE?: number;
  QT_PRODUTOS_ORIG?: number;
  QT_PRODUTOS_WEBSITE?: number;
  CATEGORIA_OTMZ?: string;
  CATEGORIA_ORIG?: string;
  CATEGORIA_INGLES?: string;
  URL_ORIG?: string;
  URL_ORIG_EN?: string;
  URL_WEBSITE?: string;
  URL_IMG_WEBSITE?: string;
  SLUG_ORIG?: string;
  SLUG_WEBSITE: string;
  LINK_AFILIADO_ORIG?: string;
  TEXT_VENDA?: string;
  META_TITLE?: string;
  META_DESCRIPTION?: string;
  FLAG_CAT_META?: number;
  FLAG_ACESSORIO?: number;
  FLAG_WEBSITE?: number;
  FLAG_LOOP?: number;
  DT_UPDATE?: Date;
  DT_CADASTRO?: Date;
  DESCRIPTION?: string;
};

type Tbl_categoria_aliexpress_rel = {
  ID_CATEGORIA: bigint;
  PARENT_ID: bigint;
  ID_MERCHANT?: number;
  QT_PRODUTOS?: number;
  FLAG_LOOP?: number;
  DT_CADASTRO?: Date;
};

type Tbl_categoria_api = {
  ID_CATEGORIA_API: bigint;
  ID_MERCHANT?: number;
  ID_PROJETO?: number;
  TABLE_NAME_PROD?: string;
  QT_PRODUTOS?: number;
  ID_CATEGORIA_PARENT?: bigint;
  ID_CATEGORIA_SITE_BR?: bigint;
  CATEGORY_ORIG?: string;
  CATEGORY_BR?: string;
  URL_CATEGORY?: string;
  MIN_SALE_PRICE?: number;
  MAX_SALE_PRICE?: number;
  QT_VOLUME_MIN?: number;
  FLAG_SORT?: number;
  FLAG_DISABLED?: number;
  DT_UPDATE_IMP?: Date;
  DT_CADASTRO?: Date;
};

type Tbl_categoria_api_project_rel = {
  ID_REL: number;
  ID_CATEGORIA_API?: bigint;
  ID_PROJECT?: number;
  DT_CREATED?: Date;
};

type Tbl_chat_atendimento = {
  ID_ATENDIMENTO: number;
  ID_PROJETO?: number;
  ID_TEPLATE?: number;
  ID_ORIGEM?: number;
  ID_MENSAGEM?: number;
  NOME_CLIENTE?: string;
  EMAIL_CLIENTE?: string;
  ASSUNTO?: string;
  LINK_AFILIADO?: string;
  OFERTA_ALVO?: string;
  FLAG_ATACADO?: number;
  FLAG_HOME?: number;
  FLAG_VALOR?: number;
  URL_DESTINO?: string;
  NOTAS_PERSONALIZADA?: string;
  MENSAGEM_CLIENTE?: string;
  DT_CATASTRO: Date;
  ANOTACOES?: string;
  DT_UPDATE_IMP?: Date;
};

type Tbl_chat_knowledge = {
  ID_KNOWLEDGE: number;
  ID_CATEGORIA?: number;
  TITULO?: string;
  INFORMACAO?: string;
  DT_CADASTRO?: Date;
  DT_UPDATE_IMP?: Date;
};

type Tbl_chat_mensagem = {
  ID_MENSAGEM: number;
  TAGS?: string;
  MENSAGEM?: string;
  DT_UPDATE_IMP?: Date;
};

type Tbl_chat_origem = {
  ID_ORIGEM: number;
  ORIGEM?: string;
  DT_UPDATE_IMP?: Date;
};

type Tbl_chat_remetente = {
  ID_REMETENTE: number;
  EMAIL?: string;
  NOME?: string;
  ASSINATURA?: string;
};

type Tbl_chat_template = {
  ID_TEMPLATE: number;
  ID_TIPO?: number;
  NOME?: string;
  TEMPLATE?: string;
  DT_CADASTRO?: Date;
  DT_UPDATE_IMP?: Date;
};

type Tbl_chat_tipo = {
  ID_TIPO: number;
  TIPO?: string;
  DT_UPDATE_IMP?: Date;
};

type Tbl_chatbot = {
  ID_CHATBOT: number;
  CHATBOT?: string;
  CATEGORIA?: string;
  NOTAS?: string;
  DT_CADASTRO?: Date;
};

type Tbl_chatbot_prompt = {
  ID_PROMPT: number;
  ID_CHATBOT?: number;
  ID_CATEGORIA?: number;
  ID_TIPO?: number;
  QT_PONTOS?: number;
  PROMPT_BR?: string;
  PROMPT_EN?: string;
  PROMPT_CARTA_VENDA?: string;
  PROMPT_META_TITULO?: string;
  PROMPT_META_DESCRIPTION?: string;
  PROMPT_CONTENT?: string;
  NOTAS?: string;
  DT_CADASTRO?: Date;
  DT_UPDATE?: Date;
};

type Tbl_chatbot_prompt_categoria = {
  ID_CATEGORIA: number;
  CATEGORIA?: string;
};

type Tbl_chatbot_prompt_tipo = {
  ID_TIPO: number;
  TIPO?: string;
};

type Tbl_copywrite = {
  ID_COPYWRITE: number;
  ID_MODULO?: number;
  ID_CADASTRO?: bigint;
  ID_PARENT?: number;
  ID_TIPO?: number;
  COPYWRITE?: string;
  VALOR?: string;
  DT_CADASTRO?: Date;
  DT_UPDATE_IMP?: Date;
};

type Tbl_copywrite_tipo = {
  ID_TIPO: number;
  TIPO?: string;
  DT_UPDATE_IMP?: Date;
};

type Tbl_idioma = {
  ID_IDIOMA: number;
  IDIOMA?: string;
  FLAG_LOOP?: number;
};

type Tbl_keyvalor = {
  ID_KEYVALOR: number;
  ID_PROJETO?: number;
  ID_TIPO?: number;
  ORDEM?: number;
  CHAVE?: string;
  VALOR?: string;
  DT_UPDATE_IMP?: Date;
};

type Tbl_keyvalor_conteudo = {
  id_conteudo: number;
  ID_KEYWORD?: number;
  ID_POSITION?: number;
  CONTEUDO?: string;
};

type Tbl_keyvalor_tipo = {
  ID_TIPO: number;
  TIPO?: string;
  DT_CADASTRO?: Date;
};

type Tbl_keyword_proibida = {
  ID_PROIBIDA: number;
  ID_PROJETO?: number;
  KEYWORD?: string;
  MOTIVO?: string;
  DT_CADASTRO?: Date;
  DT_UPDATE_IMP?: Date;
};

type Tbl_keywords = {
  ID_KEYWORD: number;
  ID_TIPO?: number;
  ID_IDIOMA?: number;
  ID_CADASTRO?: bigint;
  ID_PROJETO?: number;
  ID_MODULO?: number;
  KEYWORD?: string;
  VALOR?: string;
  POSITION_ATUAL?: number;
  QT_SEARCH?: number;
  QT_VIEW?: number;
  QT_CLICK?: number;
  CTR?: number;
  DT_UPDATE?: Date;
  DT_CADASTRO?: Date;
};

type Tbl_keywords_position = {
  ID_POSITION: number;
  ID_MODULO?: number;
  ID_CADASTRO?: bigint;
  ID_KEYWORD?: number;
  POSITION_ATUAL?: number;
  POSITION_ANT?: number;
  QT_CLICK?: number;
  QT_VIEW?: number;
  CTR?: number;
  ID_PROJETO?: number;
  DT_CADASTRO?: Date;
  DT_UPDATE?: Date;
};

type Tbl_keywords_produto = {
  ID_KEYWORD: number;
  ID_PRODUTO: bigint;
  POSITION_ATUAL?: number;
  DT_UPDATE?: Date;
  DT_CADASTRO?: Date;
};

type Tbl_marca = {
  ID_MARCA: bigint;
  MARCA_NAME?: string;
  URL_IMAGEM?: string;
  DT_CADASTRO?: Date;
};

type Tbl_marca_cat_rel = {
  id_marca: bigint;
  id_categoria: bigint;
};

type Tbl_merchant = {
  ID_MERCHANT: number;
  NOME?: string;
  ANOTACOES?: string;
  DT_CADASTRO?: Date;
  DT_UPDATE_IMP?: Date;
};

type Tbl_metadata = {
  ID_METADATA: number;
  ID_TIPO?: number;
  ID_CATEGORIA?: number;
  METADADO_ORIG?: string;
  METADADO_OTMZ?: string;
  METADADO_SING?: string;
  FLAG_KEYWORD?: number;
  FLAG_PRODUTO?: number;
  FLAG_REVISADO?: number;
  FLAG_FRASE?: number;
  FLAG_LOOP?: number;
};

type Tbl_metadata_rel = {
  ID_METADATA_REL: number;
  ID_METADATA: number;
  ID_PRODUTO: number;
  ID_FAMILIA?: number;
  ID_GRUPO?: number;
  ID_SUBGRUPO?: number;
  ID_SUBGRUPO02?: number;
  ID_SUBGRUPO03?: number;
  ID_CATEGORIA?: number;
  FLAG_LOOP?: number;
  DT_CADASTRO?: Date;
};

type Tbl_modulo = {
  ID_MODULO: number;
  MODULO?: string;
  ANOTACOES?: string;
  DT_UPDATE_IMP?: Date;
};

type Tbl_oferta = {
  ID_OFERTA: number;
  ID_PROJETO?: number;
  ID_POST?: number;
  ID_PRODUTO?: bigint;
  OFERTA_NOME?: string;
  CARTA_VENDA?: string;
  CONTEUDO?: string;
  ID_FAMILIA?: bigint;
  ID_GRUPO?: bigint;
  ID_SUBGRUPO?: bigint;
  ID_SUBGRUPO02?: bigint;
  ID_SUBGRUPO03?: bigint;
  REGULAR_PRICE_DOLAR?: number;
  SALE_PRICE_DOLAR?: number;
  URL_SLUG?: string;
  URL_ALI_PRODUTO?: string;
  URL_ALI_AFF?: string;
  URL_WEBSITE?: string;
  URL_IMAGEM?: string;
  URL_VIDEO?: string;
  META_TITLE?: string;
  META_DESCRIPTION?: string;
  META_FOCUSKWD?: string;
  FLAG_EXPORTE?: number;
  FLAG_OTMZ_MANUAL?: number;
  FLAG_LOOP?: number;
  DT_UPDATE?: Date;
  DT_CADASTRO?: Date;
  FLAG_NAO_EXCLUIR?: string;
  FLAG_PRECO_MAX?: number;
};

type Tbl_oferta_rel = {
  ID_OFERTA: number;
  ID_PRODUTO: bigint;
  ID_POST?: number;
  ID_PROJETO?: number;
  DT_CADASTRO?: Date;
};

type Tbl_options = {
  id_options: number;
  id_module?: number;
  options_key?: string;
  options_value?: string;
};

type Tbl_otmz_call_to_action = {
  ID_CALL_TO_ACTION: number;
  ID_CATEGORIA?: number;
  CALL_TO_ACTION?: string;
  DT_CADASTRO?: Date;
  DT_UPDATE_IMP?: Date;
};

type Tbl_otmz_preposicao = {
  ID_PREPOSICAO: number;
  PRIORIDADE?: number;
  PREPOSICAO?: string;
  DT_CADASTRO?: Date;
  DT_UPDATE_IMP?: Date;
};

type Tbl_otmz_replace = {
  ID_REPLACE: number;
  ID_TYPE?: number;
  ID_PROJETO?: number;
  ID_CATEGORIA?: bigint;
  CATEGORIA?: string;
  KEYWORD_OLD?: string;
  KEYWORD_NEW?: string;
  ORDEM?: number;
  DT_CADASTRO?: Date;
  DT_UPDATE_IMP?: Date;
};

type Tbl_product = {
  ID_OFERTA: number;
  ID_PROJETO?: number;
  ID_POST?: number;
  ID_PRODUTO?: bigint;
  FIRST_LEVEL_CATEGORY_ID?: bigint;
  FIRST_LEVEL_CATEGORY_NAME?: string;
  SECOND_LEVEL_CATEGORY_ID?: bigint;
  SECOND_LEVEL_CATEGORY_NAME?: string;
  ID_FAMILIA?: bigint;
  ID_GRUPO?: bigint;
  ID_SUBGRUPO?: bigint;
  ID_SUBGRUPO02?: bigint;
  ID_SUBGRUPO03?: bigint;
  FAMILIA?: string;
  GRUPO?: string;
  SUBGRUPO?: string;
  SUBGRUPO02?: string;
  SUBGRUPO03?: string;
};

type Tbl_product_content = {
  ID_PRODUCT: bigint;
  CHAMADA01?: string;
  CHAMADA02?: string;
  CHAMADA03?: string;
  VANTAGENS?: string;
  RELACIONADAS?: string;
  CARACTERISTICAS?: string;
  DESC_MERCHANT?: string;
  PACOTE?: string;
  REVIEWS?: string;
  OFERTA_COMPARAR?: string;
  OFERTA_VENDEDOR?: string;
  URL_DESC_MERCHANT?: string;
  FLAG_LOOP?: number;
  DT_CREATED?: Date;
  DT_UPDATE?: Date;
  PROVISORIO?: string;
};

type Tbl_product_store_rel = {
  ID_PRODUCT_STORE_REL: number;
  ID_PRODUTO: bigint;
  COMPANYID?: bigint;
};

type Tbl_produto_atributo_rel = {
  ID_ATRIBUTO_REL: number;
  ID_PRODUTO?: bigint;
  ID_ATRIBUTO?: number;
  ID_ATRIBUTO_VALOR?: number;
  ID_POST?: number;
  ID_FAMILIA?: bigint;
  ID_GRUPO?: bigint;
  ID_SUBGRUPO?: bigint;
  ID_SUBGRUPO02?: bigint;
  ID_SUBGRUPO03?: bigint;
  ATRIBUTO?: string;
  VALOR?: string;
  QT_IMPORTANCIA?: string;
  PRODUCT_PROP?: bigint;
  DATA_ATTR?: bigint;
  FLAG_LOOP?: number;
  FLAG_EXPORTA?: number;
};

type Tbl_produto_comentarios = {
  ID_COMENTARIO: number;
  COMENATRIO: string;
  DT_UPDATE_IMP?: Date;
};

type Tbl_produto_imagens = {
  ID_IMAGEM: number;
  ID_PRODUTO?: bigint;
  ID_POST?: number;
  ID_POST_IMG?: number;
  CODIGO?: string;
  URL_WEBSITE?: string;
  URL_MERCHANT?: string;
  NOME?: string;
  SLUG?: string;
  EXTENSAO?: string;
  TITULO_IMAGEM?: string;
  ALT?: string;
  TITLE?: string;
  FLAG_PRINCIPAL?: number;
  FLAG_LOOP?: number;
  DESCRICAO_IMAGEM?: string;
};

type Tbl_produto_importe = {
  ID_PRODUTO: bigint;
  ID_PARENT?: bigint;
  FLAG_OFFERS_CREATE?: number;
  ID_PROJETO?: number;
  ID_MERCHANT?: number;
  ID_TIPO_IMPORTE?: number;
  ID_FAMILIA?: bigint;
  ID_GRUPO?: bigint;
  ID_SUBGRUPO?: bigint;
  ID_SUBGRUPO02?: bigint;
  ID_SUBGRUPO03?: bigint;
  ID_CATEGORIA_PRINCIPAL?: bigint;
  CATEGORIA_PRINCIPAL?: string;
  FIRST_LEVEL_CATEGORY_ID?: bigint;
  FIRST_LEVEL_CATEGORY_NAME?: string;
  SECOND_LEVEL_CATEGORY_ID?: bigint;
  SECOND_LEVEL_CATEGORY_NAME?: string;
  COMMISSIONRATE?: number;
  SALEPRICE?: number;
  ORIGINALPRICE?: number;
  DISCOUNT?: number;
  COMMISSION?: number;
  COMMISSION30DAYS?: number;
  VOLUME?: number;
  EVALUATESCORE?: number;
  QUANTITY?: number;
  OWNCAT?: number;
  COUNTREVIEW?: number;
  TIMELEFT?: number;
  LOTNUM?: number;
  VALIDTIME?: Date;
  AVAILABILITY?: number;
  REFERENCIA?: string;
  PRODUCTTITLE_ORIG?: string;
  PRODUCTTITLE_OTMZ?: string;
  CARTA_VENDA?: string;
  CONTEUDO?: string;
  KEYWORD_PRINCIPAL?: string;
  KEYWORD_TIPO_ITEM?: string;
  PACKAGETYPE?: string;
  URL_SLUG?: string;
  URL_ALI_AFF?: string;
  URL_ALI_PRODUTO?: string;
  URL_ALI_IMAGEM?: string;
  URL_ALI_VIDEO?: string;
  URL_DESCRIPTION?: string;
  URLS_ALI_GALERIA?: string;
  STOREURLAFF?: string;
  STOREURL?: string;
  STORENAME?: string;
  FREESHIPPINGCOUNTRY?: string;
  ATTRIBUTE?: string;
  DESCRIPTION_OTMZ?: string;
  DESCRIPTION_BR?: string;
  DESCRIPTION_ING?: string;
  QT_TENTATIVAS?: number;
  NOME_HASH1?: string;
  NOME_HASH2?: string;
  NOME_HASH3?: string;
  FLAG_CONTEUDO?: number;
  META_TITLE?: string;
  META_DESCRIPTION?: string;
  META_FOCUSKWD?: string;
  INATIVO?: number;
  KEYWORD01?: string;
  KEYWORD02?: string;
  KEYWORD03?: string;
  FLAG_KEYWORD?: number;
  FLAG_INDISPONIVEL?: number;
  FLAG_EXCLUIDO?: number;
  FLAG_LOOP?: number;
  FLAG_EXPORTE?: number;
  FLAG_OTMZ: number;
  FLAG_ACTION?: number;
  FLAG_JSON?: number;
  FLAG_IMAGENS?: number;
  FLAG_ATRIBUTOS?: number;
  FLAG_LOJA?: number;
  FLAG_VARIACOES?: number;
  FLAG_SOURCE_JSON?: number;
  FLAG_MAINTENANCE?: number;
  FLAG_ERRO_GERAL?: number;
  FLAG_ERRO_API?: number;
  FLAG_ERRO_HTML?: number;
  FLAG_OFERTA?: number;
  FLAG_UPDATE_API?: number;
  QT_OFERTAS?: number;
  DT_UPDATE_API?: Date;
  DT_UPDATE_IMP?: Date;
  DT_EXPORTE?: Date;
  DT_UPDATE?: Date;
  DT_CADASTRO?: Date;
  DT_ERRO?: Date;
  FLAG_SCRAPER?: number;
  FLAG_OTMZ_AUTO?: number;
  FLAG_OTMZ_MANUAL?: number;
  DT_SCRAPER?: Date;
  DT_OTMZ_AUTO?: Date;
  DT_OTMZ_MANUAL?: Date;
  FLAG_PRECO_MAX?: number;
};

type Tbl_produto_proibido = {
  ID_PRODUTO: bigint;
  ID_PROJETO?: number;
  URL?: string;
  PRODUTO_NOME?: string;
  DT_CADASTRO?: Date;
};

type Tbl_produto_projeto_rel = {
  ID_PRODUTO: bigint;
  ID_PROJETO: number;
  DT_CADASTRO?: Date;
};

type Tbl_projeto = {
  ID_PROJETO: number;
  ID_CATEGORIA?: number;
  ID_SUBCATEGORIA?: number;
  ID_IDIOMA?: number;
  ID_STATUS?: number;
  ID_PLATAFORMA?: number;
  ID_CONTA_GOOGLE?: number;
  ID_SERVER?: number;
  ID_AFF_PROGRAMA?: number;
  NOME?: string;
  DOMINIO?: string;
  ID_CATEGORIA_MERCHANT?: bigint;
  CATEGORIA_MERCHANT?: string;
  CATEGORIA_LINK_AFF?: string;
  QT_PRODUTOS?: number;
  PROJ_TITULO?: string;
  PATH_LOGO?: string;
  PATH_MINDMAPPER?: string;
  PROJ_EMAIL?: string;
  EMAIL_SENHA?: string;
  IP?: string;
  CPANEL_URL?: string;
  CPANEL_USUARIO?: string;
  CPANEL_SENHA?: string;
  DB_API_HOST?: string;
  DB_API_NAME?: string;
  DB_API_USUARIO?: string;
  DB_API_SENHA?: string;
  DB_WP_HOST?: string;
  DB_WP_NAME?: string;
  DB_WP_USUARIO?: string;
  DB_WP_SENHA?: string;
  WEBSITE_URLADM?: string;
  WEBSITE_USUARIO?: string;
  WEBSITE_SENHA?: string;
  WEBSITE_EMAIL?: string;
  WEBSITE_SITEMAPS?: string;
  WEBSITE_ROBOTS?: string;
  WEBSITE_URL?: string;
  WEBSITE_BASE_URL?: string;
  NICHO_PROJETO?: string;
  ALI_APP_KEY?: string;
  ALI_APP_SECRET?: string;
  ALI_TRACKING_ID?: string;
  ALI_LINGUA?: string;
  ALI_USER?: string;
  API_LANGUAGE?: string;
  API_CURRENCY?: string;
  API_WOO_KEY?: string;
  API_WOO_SECRET?: string;
  ADMITAD_AFFILIATE?: string;
  ADMITAD_AFFILIATE01?: string;
  ADMITAD_AFFILIATE02?: string;
  ADMITAD_AFFILIATE03?: string;
  META_TITLE?: string;
  META_FOCUSKWD?: string;
  VALOR_MINIMO?: number;
  FLAG_MONGODB?: number;
  META_DESCRIPTION?: string;
  PROJ_DESCRICAO?: string;
  ANOTACOES?: string;
  HTTPS?: number;
  FLAG_ROBOT?: number;
  INATIVO?: number;
  DT_ALTERACAO?: Date;
  DT_UPDATE_BOT04?: Date;
  DT_UPDATE_BOT03?: Date;
  DT_UPDATE?: Date;
  DT_DOMAIN?: Date;
  DT_CADASTRO?: Date;
  DT_UPDATE_IMP?: Date;
  TABELA_NAME?: string;
  URL_BASE1?: string;
  URL_BASE2?: string;
  URL_BASE3?: string;
  URL_BASE4?: string;
  URL_BASE5?: string;
  URL_BASE6?: string;
  URL_BASE7?: string;
  URL_BASE8?: string;
  URL_BASE9?: string;
  URL_BASE10?: string;
  LINK_AFILIADO1?: string;
  LINK_AFILIADO2?: string;
  LINK_AFILIADO3?: string;
  LINK_AFILIADO4?: string;
  LINK_AFILIADO5?: string;
  LINK_AFILIADO6?: string;
  LINK_AFILIADO7?: string;
  LINK_AFILIADO8?: string;
  LINK_AFILIADO9?: string;
  LINK_AFILIADO10?: string;
};

type Tbl_projeto_categoria = {
  ID_CATEGORIA: number;
  ID_ALIEXPRESS?: number;
  CATEGORIA?: string;
  ANOTACOES?: string;
  INATIVO?: number;
  DT_CADASTRO?: Date;
  DT_UPDATE_IMP?: Date;
};

type Tbl_projeto_config = {
  ID_CONFIG: number;
  ID_PROJETO?: number;
  ID_TIPO_CONFIG: number;
  CHAVE?: string;
  VALOR?: string;
  INATIVO?: number;
  DT_UPDATE_IMP?: Date;
};

type Tbl_projeto_contas_google = {
  ID_CONTA_GOOGLE: number;
  ID_PROJETO?: number;
  CONTA_GOOGLE?: string;
  EMAIL?: string;
  SENHA?: string;
  ANOTACOES?: string;
  INATIVO?: number;
  DT_CADASTRO?: Date;
  DT_UPDATE_IMP?: Date;
};

type Tbl_projeto_estatistica = {
  ID_ESTATISTICA: number;
  ID_PROJETO?: number;
  ID_TIPO_PERIODO?: number;
  QT_PRODUTOS?: number;
  VIEWS_PRODUTOS?: number;
  QT_DIRECIONADAS?: number;
  QT_LEADS?: number;
  SESSOES?: number;
  USUARIOS?: number;
  DURACAO?: string;
  PG_SESSAO?: number;
  TX_REJEICAO?: number;
  PCT_NOVASESSOES?: number;
  PCT_ORGANICO?: number;
  TX_CONVERSAO_WEBSITE?: number;
  ALI_ADVERTISING_CLICKS?: number;
  ALI_PV?: number;
  ALI_ORDER_QUANTITY?: number;
  ALI_CONVERSION_RATE?: number;
  ALI_ESTIMATED_COMMISSION?: number;
  ID_KPI?: number;
  QT_OTMZ?: number;
  QT_UPDATE?: number;
  QT_MONITOR?: number;
  QT_NAO_OTMZ?: number;
  QT_PRECO_30_DIAS?: number;
  DT_FINAL?: Date;
  DT_INICIAL?: Date;
  DT_KPI_PLATAFORMA?: Date;
  DT_CADASTRO?: Date;
  ANOTACOES?: string;
  DT_UPDATE_IMP?: Date;
};

type Tbl_projeto_etapas = {
  ID_ETAPA: number;
  ETAPA?: string;
  ANOTACOES?: string;
  INATIVO?: number;
  DT_CADASTRO?: Date;
  DT_UPDATE_IMP?: Date;
};

type Tbl_projeto_menu = {
  ID_MENU: number;
  ID_PROJETO?: number;
  NOME?: string;
  DT_CADASTRO?: Date;
  DT_UPDATE_IMP?: Date;
};

type Tbl_projeto_menuitem = {
  ID_MENUITEM: number;
  ID_PROJETO?: number;
  ID_MENU?: number;
  ID_PARENT?: number;
  NOME?: string;
  URL?: string;
  TITLE_ATTRIBUTE?: string;
  ICON_CLASSE?: string;
  DT_CADASTRO?: Date;
  DT_UPDATE_IMP?: Date;
};

type Tbl_projeto_page = {
  ID_PAGE: number;
  ID_PROJETO?: number;
  ASSUNTO?: string;
  CONTEUDO?: string;
  URL_IMAGEM?: string;
  URL_SLUG?: string;
  META_TITLE?: string;
  META_DESCRIPTION?: string;
  META_KEYWORD?: string;
  FLAG_NOINDEX?: number;
  DT_UPDATE?: number;
  DT_CADASTRO?: number;
  DT_UPDATE_IMP?: Date;
};

type Tbl_projeto_plataforma = {
  ID_PLATAFORMA: number;
  INATIVO?: number;
  DT_CADASTRO?: Date;
  PLATAFORMA?: string;
  URL?: string;
  ANOTACOES?: string;
  DT_UPDATE_IMP?: Date;
};

type Tbl_projeto_servers = {
  ID_SERVER: number;
  NOME?: string;
  URL?: string;
  USUARIO?: string;
  SENHA?: string;
  ANOTACOES?: string;
  INATIVO?: number;
  DT_CADASTRO?: Date;
  DT_UPDATE_IMP?: Date;
};

type Tbl_projeto_subcategoria = {
  ID_SUBCATEGORIA: number;
  ID_CATEGORIA?: number;
  ID_ALIEXPRESS?: number;
  INATIVO?: number;
  DT_CADASTRO?: Date;
  SUBCATEGORIA?: string;
  ANOTACOES?: string;
  DT_UPDATE_IMP?: Date;
};

type Tbl_qt_produtos = {
  ID_CATEGORIA_API: number;
  TABLE_NAME_PROD?: string;
  QT_PRODUTOS?: number;
  DT_UPDATE?: Date;
};

type Tbl_scrapping_source_cat = {
  ID_URL_CAT: number;
  SOURCE_JSON?: string;
  DT_UPDATE?: Date;
  DT_CADASTRO?: Date;
  FLAG_SOURCE?: number;
  FLAG_ERRO?: number;
};

type Tbl_scrapping_url_cat = {
  ID_URL_CAT: number;
  ID_PROJETO?: number;
  ID_ORDER?: number;
  URL_PAGE?: string;
  NO_PAGE?: number;
  QT_PRODUTOS_IMP?: number;
  QT_PRODUTOS_PAGE?: number;
  ID_CATEGORIA_BASE?: bigint;
  CATEGORIA_BASE?: string;
  ID_FAMILIA?: bigint;
  ID_GRUPO?: bigint;
  ID_SUBGRUPO?: bigint;
  ID_SUBGRUPO02?: bigint;
  ID_SUBGRUPO03?: bigint;
  QT_TENTATIVA?: number;
  FLAG_ERRO?: number;
  FLAG_SCRAPPING?: number;
  FLAG_IMP_PRODUTO?: number;
  DT_PROC_SCRAPER?: Date;
  DT_SCRAPPING?: Date;
  DT_IMP_PRODUTO?: Date;
  DT_UPDATE?: Date;
  DT_CADASTRO?: Date;
  HISTORICO_IMPORTE?: string;
  HISTORICO_SCRAPPING?: string;
};

type Tbl_status = {
  ID_STATUS: number;
  STATUS?: string;
  NOTAS?: string;
  DT_UPDATE_IMP?: Date;
};

type Tbl_store = {
  COMPANYID: bigint;
  STORENAME?: string;
  COUNTRYCOMPLETENAME?: string;
  PROVINCE?: string;
  STOREURL?: string;
  POSITIVENUM?: number;
  POSITIVERATE?: number;
  FOLLOWINGNUMBER?: number;
  OPENEDYEAR?: number;
  OPENTIME?: string;
  DT_UPDATE?: Date;
  DT_CREATED?: Date;
};

type Tbl_system_config = {
  ID_CONFIG: number;
  ID_PROJETO_START: number;
  ID_MERCHANT?: number;
  CAMBIO_DOLAR?: number;
  TX_AJUSTE?: number;
  LOCALCURRENCY?: string;
  VL_MAXIMO_DOLAR?: number;
  VL_MINIMO_DOLAR?: number;
  CONTEUDO_AFILIADO?: string;
  CONTEUDO_ALIBABA?: string;
  CONTEUDO_BACKUP?: string;
  LANGUAGE?: string;
  DT_UPDATE_IMP?: Date;
  TX_DOLAR_DOLAR?: number;
  TX_DOLAR_REAL?: number;
  TX_EURO_EURO?: number;
  ID_FAMILIA?: bigint;
  ID_GRUPO?: bigint;
  JSON_API_CAT?: string;
};

type Tbl_tabela = {
  tabela?: string;
  DT_UPDATE_IMP?: Date;
};

type Tbl_taxonomia_projeto = {
  ID_TAXONOMIA_PROJETO: number;
  PROJETO?: string;
  ID_PROJETO?: number;
  ID_TAXONOMIA?: bigint;
  ID_PARENT?: number;
  TAXONOMIA_ING?: string;
  TAXONOMIA_PT?: string;
  URL_DESTINO?: number;
  FLAG_API?: number;
  ANOTACOES?: string;
  DT_CADASTRO?: Date;
  DT_UPDATE_IMP?: Date;
};

type Tbl_tipo_importe = {
  ID_TIPO_IMPORTE: number;
  TIPO_IMPORTE?: string;
  DT_UPDATE_IMP?: Date;
};

type Tbl_variacao = {
  ID_VARIACAO: bigint;
  VARIACAO_NAME?: string;
  DT_CADASTRO?: Date;
};

type Tbl_variacao_cat_rel = {
  ID_VARIACAO: bigint;
  ID_CATEGORIA: bigint;
};

type Tbl_variacao_valor = {
  ID_VARIACAO_VALOR: bigint;
  VALOR_NAME?: string;
};

type Tbl_variacao_valor_cat_rel = {
  ID_VARIACAO: bigint;
  ID_VARIACAO_VALOR: bigint;
  ID_CATEGORIA: bigint;
  ID_IDIOMA?: number;
  URL_CAT_VALOR?: string;
  DT_CADASTRO?: Date;
};

type Tbl_word_mapping = {
  ID_WORD: number;
  ID_PROJETO?: number;
  ID_TIPO?: number;
  WORD?: string;
  POSITION?: string;
  DT_UPDATE_IMP?: Date;
};
