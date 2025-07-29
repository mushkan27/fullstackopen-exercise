import { useState, useEffect } from 'react';
import axios from 'axios';

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);
  let token = null;

  const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
  };

  // Fetch all resources on initial render
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(baseUrl);
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };
    fetchResources();
  }, [baseUrl]);

  // Create new resource
  const create = async (resource) => {
    const config = token ? { headers: { Authorization: token } } : {};
    try {
      const response = await axios.post(baseUrl, resource, config);
      setResources([...resources, response.data]);
      return response.data;
    } catch (error) {
      console.error('Error creating resource:', error);
      throw error;
    }
  };

  const service = {
    create,
    setToken
  };

  return [resources, service];
};

export default useResource;