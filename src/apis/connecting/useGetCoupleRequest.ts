import { useQuery } from '@tanstack/react-query';
import api from '@apis/common/api';

const getCoupleRequest = async () => {
  const res = await api.get('/couple/request');
  return res.data;
};

const useGetCoupleRequest = () => {
  return useQuery({
    queryKey: ['coupleRequest'],
    queryFn: getCoupleRequest,
  });
};

export default useGetCoupleRequest;
