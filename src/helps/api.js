import axios from 'axios';

export const API_BASE_URL = 'https://poorpollsurvey.up.railway.app/polls';
export const HUB_BASE_URL = 'https://poorpollsurvey.up.railway.app/hubs/polls';
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.response.use(
    (response) => {
        if (response.status === 204) return true;
        return response.data;
    },
    (error) => {
        if (error.response) {
            console.error('API Error:', {
                data: error.response.data,
                status: error.response.status,
            });
        }
        else {
            console.error('Network Error:', error.message);
        }
        return null;
    }
);

export const viewAllPolls = () => apiClient.get('');

export const viewPollByCode = (pollCode) => apiClient.get(`/${pollCode}`);

export const addNewPoll = (pollData) => apiClient.post('', pollData);

export const editPollByCode = (pollCode, pollData) => apiClient.put(`/${pollCode}`, pollData);

export const deletePollByCode = (pollCode, creatorToken) => 
    apiClient.delete(`/${pollCode}`, { headers: { 'X-Creator-Token': creatorToken } });

export const closePoll = (pollCode, creatorToken) => 
    apiClient.patch(`/${pollCode}/close`, { creatorToken });

export const votePoll = (pollCode, optionId) => 
    apiClient.post(`/${pollCode}/vote`, { optionId });

export const getPollResults = (pollCode) => apiClient.get(`/${pollCode}/results`);