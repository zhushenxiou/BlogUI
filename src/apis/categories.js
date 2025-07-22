import request from "@/utils/request";

/**
 * @description 获取分类列表（分页）
 * @param {object} params - 查询参数
 * @param {number} [params.page=1] - 当前页码 (可选, 默认为 1)
 * @param {number} [params.limit=10] - 每页数量 (可选, 默认为 10)
 * @returns {Promise<object>} 包含分类列表和分页信息的对象 { data: [...], meta: { totalItems, ... } }
 */
export const getCategories = (params) => request.get("/categories", { params });

/**
 * @description 创建新分类
 * @param {object} data - 分类数据
 * @param {string} data.name - 分类名称
 * @returns {Promise<object>} 新创建的分类对象 { id, name }
 */
export const createCategory = (data) => request.post("/categories", data);

/**
 * @description 更新指定分类
 * @param {number|string} id - 要更新的分类ID
 * @param {object} data - 要更新的分类数据
 * @param {string} data.name - 新的分类名称
 * @returns {Promise<object>} 更新后的分类对象 { id, name }
 */
export const updateCategory = (id, data) =>
  request.put(`/categories/${id}`, data);

/**
 * @description 删除指定分类
 * @param {number|string} id - 要删除的分类ID
 * @returns {Promise<void>} Promise resolved 之后无返回内容
 */
export const deleteCategory = (id) => request.delete(`/categories/${id}`);
