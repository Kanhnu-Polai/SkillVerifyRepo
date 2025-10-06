import axios from 'axios';
import {
  fetchJobsStart,
  fetchJobsSuccess,
  fetchJobsFailure,
} from '../slices/jobSlice';
import { timeAgo } from '../../utils/time';   // ←  points to the file above

const api = axios.create({
  baseURL: 'http://localhost:8086/api/job',
});

export const fetchJobsByPosterEmail = email => async dispatch => {
  dispatch(fetchJobsStart());
  try {
    const { data } = await api.get(`/getjobs/${email}`);

    // add a computed field that the card component can show
    const withAgo = data.map(j => ({
      ...j,
      postedAgo: j.createdAt ? timeAgo(j.createdAt) : 'just now',
    }));

    dispatch(fetchJobsSuccess(withAgo));
  } catch (err) {
    dispatch(
      fetchJobsFailure(err.response?.data?.message || err.message)
    );
  }
};

/* ---------- delete ---------- */
export const deleteJobById = (jobId, email) => async dispatch => {
  try {
    await api.delete('/delete', { params: { jobId, publisherEmail: email } });
    // re-sync list
    dispatch(fetchJobsByPosterEmail(email));
  } catch (err) {
    console.error('❌ Job delete failed:', err);
  }
};