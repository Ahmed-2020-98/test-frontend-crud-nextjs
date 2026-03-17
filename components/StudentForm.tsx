'use client';

import { useState, useEffect } from 'react';
import { Student, StudentFormData } from '@/types/student';

interface StudentFormProps {
  student: Student | null;
  onSave: (data: StudentFormData) => void;
  onCancel: () => void;
}

export default function StudentForm({ student, onSave, onCancel }: StudentFormProps) {
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    age: null,
    grade: '',
    major: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        phone: student.phone,
        address: student.address || '',
        age: student.age,
        grade: student.grade || '',
        major: student.major || '',
      });
    }
  }, [student]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صالح';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    }
    if (formData.age !== null && (formData.age < 1 || formData.age > 120)) {
      newErrors.age = 'العمر يجب أن يكون بين 1 و 120';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? (value ? parseInt(value) : null) : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {student ? 'تعديل بيانات الطالب' : 'إضافة طالب جديد'}
        </h2>
        <p className="text-gray-600">
          {student ? 'قم بتحديث بيانات الطالب في النموذج أدناه' : 'أدخل بيانات الطالب الجديد في النموذج أدناه'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* الاسم */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              الاسم الكامل *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                errors.name
                  ? 'border-red-500 focus:ring-red-200 bg-red-50'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
              placeholder="أدخل الاسم الكامل"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* البريد الإلكتروني */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              البريد الإلكتروني *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                errors.email
                  ? 'border-red-500 focus:ring-red-200 bg-red-50'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
              placeholder="example@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* رقم الهاتف */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
              رقم الهاتف *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                errors.phone
                  ? 'border-red-500 focus:ring-red-200 bg-red-50'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
              placeholder="0501234567"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
          </div>

          {/* العمر */}
          <div>
            <label htmlFor="age" className="block text-sm font-semibold text-gray-700 mb-2">
              العمر
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age || ''}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 ${
                errors.age
                  ? 'border-red-500 focus:ring-red-200 bg-red-50'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
              placeholder="مثال: 20"
              min="1"
              max="120"
            />
            {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
          </div>

          {/* الصف */}
          <div>
            <label htmlFor="grade" className="block text-sm font-semibold text-gray-700 mb-2">
              الصف الدراسي
            </label>
            <select
              id="grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
            >
              <option value="">اختر الصف</option>
              <option value="الأول">الأول</option>
              <option value="الثاني">الثاني</option>
              <option value="الثالث">الثالث</option>
              <option value="الرابع">الرابع</option>
              <option value="الخامس">الخامس</option>
              <option value="السادس">السادس</option>
            </select>
          </div>

          {/* التخصص */}
          <div>
            <label htmlFor="major" className="block text-sm font-semibold text-gray-700 mb-2">
              التخصص
            </label>
            <select
              id="major"
              name="major"
              value={formData.major}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none"
            >
              <option value="">اختر التخصص</option>
              <option value="علوم">علوم</option>
              <option value="أدبي">أدبي</option>
              <option value="تجاري">تجاري</option>
              <option value="صناعي">صناعي</option>
            </select>
          </div>
        </div>

        {/* العنوان */}
        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
            العنوان
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 focus:outline-none resize-none"
            placeholder="أدخل العنوان الكامل"
          />
        </div>

        {/* أزرار التحكم */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {student ? 'تحديث البيانات' : 'إضافة الطالب'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}
