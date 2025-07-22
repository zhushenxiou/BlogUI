import request from "@/utils/request";

/**
 * @description 获取文章列表（分页）
 * @param {object} params - 查询参数
 * @param {number} [params.page=1] - 当前页码 (可选, 默认为 1)
 * @param {number} [params.limit=10] - 每页数量 (可选, 默认为 10)
 * @param {string} [params.category_id] - 分类ID (可选)
 * @param {string} [params.search] - 模糊搜索标题或分类 (可选)
 * @returns {Promise<object>} 包含文章列表（及作者、分类信息）和分页信息的对象 { data: [...], meta: { totalItems, ... } }
 */
export const getPosts = (params) => request.get("/posts", { params });

/**
 * @description 获取单篇文章详情
 * @param {number|string} id - 文章ID
 * @returns {Promise<object>} 包含文章详情（及作者、分类信息）的对象
 */
export const getPostById = (id) => request.get(`/posts/${id}`);

/**
 * @description 创建新文章
 * @param {object} data - 文章数据
 * @param {string} data.title - 文章标题
 * @param {string} data.content - 文章正文内容
 * @param {number|null} [data.category_id] - 分类ID (可选)
 * @returns {Promise<object>} 新创建的文章对象
 */
export const createPost = (data) => request.post("/posts", data);

/**
 * @description 更新指定文章
 * @param {number|string} id - 要更新的文章ID
 * @param {object} data - 要更新的文章数据
 * @param {string} data.title - 文章标题
 * @param {string} data.content - 文章正文内容
 * @param {number|null} [data.category_id] - 分类ID (可选)
 * @returns {Promise<object>} 更新后的文章对象
 */
export const updatePost = (id, data) => request.put(`/posts/${id}`, data);

/**
 * @description 删除指定文章
 * @param {number|string} id - 要删除的文章ID
 * @returns {Promise<void>} Promise resolved 之后无返回内容
 */
export const deletePost = (id) => request.delete(`/posts/${id}`);
