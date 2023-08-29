import api from '../api';

export async function fetchCategories() {
  try {
    const response = await api.get('/categories');
    return response.data.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function fetchSubjects() {
  try {
    const response = await api.get('/subjects');
    return response.data.subjects;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return [];
  }
}