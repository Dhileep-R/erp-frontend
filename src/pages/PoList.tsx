import { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

interface Po {
  id: number;
  poNumber: string;
}

export default function PoList(){
  const [pos, setPos] = useState<Po[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get<Po[]>(`${process.env.REACT_APP_PROCUREMENT_URL}/po`)
      .then(res => setPos(res.data));
  }, []);

  return (
    <>
    <div style={{display:"flex"}}>
        <h3>PO(s) List</h3>
        <button onClick={() => navigate(`/po`)}>Add PO</button>
    </div>
      <table border={1}>
        <tbody>
          {pos.map(po => (
            <tr key={po.id}>
              <td>{po.poNumber}</td>
              <td>
                <button onClick={() => navigate(`/po/${po.id}`)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
