'use client';

import { Student } from '@/types/student';

interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

export default function StudentList({ students, onEdit, onDelete }: StudentListProps) {
  if (students.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">لا يوجد طلاب</h3>
        <p className="text-gray-500">ابدأ بإضافة طالب جديد للنظام</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-4 text-right text-sm font-semibold">الاسم</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">البريد الإلكتروني</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">رقم الهاتف</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">العمر</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">الصف</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">التخصص</th>
              <th className="px-6 py-4 text-center text-sm font-semibold">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student, index) => (
              <tr
                key={student.id}
                className={`transition-all duration-200 hover:bg-blue-50 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                      {student.name.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900">{student.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">{student.email}</td>
                <td className="px-6 py-4 text-gray-700" dir="ltr">{student.phone}</td>
                <td className="px-6 py-4 text-gray-700 text-center">{student.age || '-'}</td>
                <td className="px-6 py-4">
                  {student.grade ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {student.grade}
                    </span>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="px-6 py-4">
                  {student.major ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      {student.major}
                    </span>
                  ) : (
                    '-'
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(student)}
                      className="inline-flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105"
                      title="تعديل"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      تعديل
                    </button>
                    <button
                      onClick={() => onDelete(student.id)}
                      className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105"
                      title="حذف"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          إجمالي الطلاب: <span className="font-bold text-gray-800">{students.length}</span>
        </p>
      </div>
    </div>
  );
}
