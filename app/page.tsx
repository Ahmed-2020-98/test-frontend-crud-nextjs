'use client';

import { useState, useEffect } from 'react';
import StudentList from '@/components/StudentList';
import StudentForm from '@/components/StudentForm';
import { Student } from '@/types/student';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      console.log('Fetching students from:', API_URL);
      const response = await fetch(`${API_URL}/students`);
      
      if (!response.ok) {
        console.error('Response not OK:', response.status, response.statusText);
        const text = await response.text();
        console.error('Response text:', text.substring(0, 500));
        return;
      }

      const data = await response.json();
      console.log('Received data:', data);
      
      if (data.success) {
        setStudents(data.data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      // عرض رسالة خطأ للمستخدم
      alert('خطأ في الاتصال بالخادم. تأكد من أن Laravel يعمل على المنفذ 8000');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = () => {
    setEditingStudent(null);
    setIsFormOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingStudent(null);
  };

  const handleSaveStudent = async (studentData: Omit<Student, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const url = editingStudent
        ? `${API_URL}/students/${editingStudent.id}`
        : `${API_URL}/students`;
      const method = editingStudent ? 'PUT' : 'POST';

      console.log('Saving student to:', url, 'Method:', method);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Error response:', response.status, text);
        alert('خطأ في حفظ البيانات: ' + response.statusText);
        return;
      }

      const data = await response.json();
      console.log('Save response:', data);
      
      if (data.success) {
        await fetchStudents();
        handleCloseForm();
        alert(data.message || 'تم الحفظ بنجاح');
      }
    } catch (error) {
      console.error('Error saving student:', error);
      alert('خطأ في الاتصال بالخادم');
    }
  };

  const handleDeleteStudent = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا الطالب؟')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/students/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('Delete error:', response.status);
        alert('خطأ في حذف الطالب: ' + response.statusText);
        return;
      }

      const data = await response.json();
      console.log('Delete response:', data);
      
      if (data.success) {
        await fetchStudents();
        alert(data.message || 'تم الحذف بنجاح');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('خطأ في الاتصال بالخادم');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">نظام إدارة الطلاب</h1>
          <p className="text-gray-600">إدارة كاملة لبيانات الطلاب - CRUD System</p>
        </header>

        {isFormOpen ? (
          <StudentForm
            student={editingStudent}
            onSave={handleSaveStudent}
            onCancel={handleCloseForm}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-700">
                قائمة الطلاب ({students.length})
              </h2>
              <button
                onClick={handleAddStudent}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                إضافة طالب جديد
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
              </div>
            ) : (
              <StudentList
                students={students}
                onEdit={handleEditStudent}
                onDelete={handleDeleteStudent}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
