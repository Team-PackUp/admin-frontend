import apiClient from "./apiClient";

export interface SystemLanguage {
  code: string;
  name: string;
}

export interface SystemSettingsResponse {
  language: string;
  // timezones?: string[];
  // themeOptions?: string[];
}

export const SystemSettingAPI = {
  fetchSettings: async (): Promise<SystemSettingsResponse> => {
    const response = await apiClient.get("/system");
    return response.data;
  },

  updateLanguage: async (code: string): Promise<void> => {
    return apiClient.put("/system/language", { code });
  },
};
