import { FC, useCallback, useEffect, useState } from 'react';

import { ApiRepository } from '../data/repository';
import { ApiResponse } from '../data/response';
import { Task } from '../models/userData';
import { useAuth } from './AuthContext';

interface Props {
  children: (data: Task[], getData: () => void) => JSX.Element;
}

export const ListTask: FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ApiResponse<Task[]>>();
  const user = useAuth();

  const getData = useCallback(() => {
    setLoading(true);
    ApiRepository.getTasks({ idUser: user.user?.id as number })
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (loading) {
    return <p>Cargando ...</p>;
  }
  if (!data) {
    return <p>Datos no encontrados</p>;
  }
  if (data.error) {
    return <p>{data.mensaje}</p>;
  }

  return children(data.data, getData);
};
