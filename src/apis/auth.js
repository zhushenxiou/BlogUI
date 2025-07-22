import request from "@/utils/request";

/**
 * @description 用户登录
 * @param {object} data - 登录凭证
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @returns {Promise<object>} 包含 token 和 user 信息的对象，例如 { token: "...", user: { id: 1, ... } }
 */
export const login = (data) => request.post("/auth/login", data);

/**
 * @description 获取当前登录用户信息
 * @returns {Promise<object>} 当前用户信息对象 { id, username, email, created_at }
 */
export const getMe = () => request.get("/auth/me");
