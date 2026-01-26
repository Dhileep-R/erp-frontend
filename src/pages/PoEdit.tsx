import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { api } from '../api';

export default function PoEdit() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const [poNumber, setPoNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔒 Prevent double API call in React 18 StrictMode
  const fetchedRef = useRef(false);

  // 🔹 Load PO when editing
  useEffect(() => {
    if (!isEdit || fetchedRef.current) return;

    fetchedRef.current = true;
    setLoading(true);

    api
      .get(`http://localhost:3002/po/${id}`)
      .then(res => setPoNumber(res.data.poNumber))
      .catch(() => setError('Failed to load PO'))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const save = async (): Promise<void> => {
    if (!poNumber.trim()) {
      setError('PO Number is required');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      if (isEdit) {
        await api.put(`http://localhost:3002/po/${id}`, { poNumber });
      } else {
        await api.post(`http://localhost:3002/po`, { poNumber });
      }
      navigate('/');
    } catch {
      setError('Failed to save PO');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <h3>{isEdit ? 'Edit PO' : 'Create PO'}</h3>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        value={poNumber}
        onChange={e => setPoNumber(e.target.value)}
        placeholder="PO Number"
        disabled={loading || saving}
      />

      <br /><br />

      <button onClick={save} disabled={saving}>
        {saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
      </button>

      <button onClick={() => navigate('/')} disabled={saving}>
        Cancel
      </button>
    </>
  );
}
