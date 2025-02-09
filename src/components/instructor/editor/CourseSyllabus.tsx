'use client';

import { useState } from 'react';
import { CourseFormData, ModuleFormData } from '@/types/courseEditor';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface Props {
  data: CourseFormData;
  onChange: (data: Partial<CourseFormData>) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function CourseSyllabus({
  data,
  onChange,
  onBack,
  onNext,
}: Props) {
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number | null>(
    null
  );

  const addModule = () => {
    const newModule: ModuleFormData = {
      title: `Module ${data.syllabus.length + 1}`,
      duration: '',
      lessons: [],
    };
    onChange({
      syllabus: [...data.syllabus, newModule],
    });
    setSelectedModuleIndex(data.syllabus.length);
  };

  const updateModule = (index: number, moduleData: Partial<ModuleFormData>) => {
    const updatedSyllabus = [...data.syllabus];
    updatedSyllabus[index] = { ...updatedSyllabus[index], ...moduleData };
    onChange({ syllabus: updatedSyllabus });
  };

  const removeModule = (index: number) => {
    const updatedSyllabus = data.syllabus.filter((_, i) => i !== index);
    onChange({ syllabus: updatedSyllabus });
    setSelectedModuleIndex(null);
  };

  const addLesson = (moduleIndex: number) => {
    const updatedSyllabus = [...data.syllabus];
    const module = updatedSyllabus[moduleIndex];
    
    module.lessons.push({
      title: `Lesson ${module.lessons.length + 1}`,
      duration: '',
      type: 'video',
      isPreview: false,
      content: {
        type: 'video',
        videoUrl: '',
      },
    });
    
    onChange({ syllabus: updatedSyllabus });
  };

  const updateLesson = (
    moduleIndex: number,
    lessonIndex: number,
    lessonData: any
  ) => {
    const updatedSyllabus = [...data.syllabus];
    const module = updatedSyllabus[moduleIndex];
    module.lessons[lessonIndex] = {
      ...module.lessons[lessonIndex],
      ...lessonData,
    };
    onChange({ syllabus: updatedSyllabus });
  };

  const removeLesson = (moduleIndex: number, lessonIndex: number) => {
    const updatedSyllabus = [...data.syllabus];
    updatedSyllabus[moduleIndex].lessons = updatedSyllabus[
      moduleIndex
    ].lessons.filter((_, i) => i !== lessonIndex);
    onChange({ syllabus: updatedSyllabus });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedSyllabus = [...data.syllabus];
    const [removed] = updatedSyllabus.splice(result.source.index, 1);
    updatedSyllabus.splice(result.destination.index, 0, removed);
    
    onChange({ syllabus: updatedSyllabus });
    if (selectedModuleIndex === result.source.index) {
      setSelectedModuleIndex(result.destination.index);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Module List */}
        <div className="md:col-span-1 space-y-4">
          <button
            onClick={addModule}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Module
          </button>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="modules">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {data.syllabus.map((module, index) => (
                    <Draggable
                      key={index}
                      draggableId={`module-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-4 rounded-md cursor-pointer ${
                            selectedModuleIndex === index
                              ? 'bg-blue-50 border-2 border-blue-500'
                              : 'bg-white border border-gray-200 hover:border-blue-500'
                          }`}
                          onClick={() => setSelectedModuleIndex(index)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{module.title}</span>
                            <span className="text-sm text-gray-500">
                              {module.lessons.length} lessons
                            </span>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* Module Editor */}
        <div className="md:col-span-2">
          {selectedModuleIndex !== null && (
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="space-y-6">
                {/* Module Title and Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Module Title
                    </label>
                    <input
                      type="text"
                      value={data.syllabus[selectedModuleIndex].title}
                      onChange={(e) =>
                        updateModule(selectedModuleIndex, { title: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={data.syllabus[selectedModuleIndex].duration}
                      onChange={(e) =>
                        updateModule(selectedModuleIndex, {
                          duration: e.target.value,
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., 2 hours"
                    />
                  </div>
                </div>

                {/* Lessons */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Lessons</h3>
                    <button
                      onClick={() => addLesson(selectedModuleIndex)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Add Lesson
                    </button>
                  </div>

                  <div className="space-y-4">
                    {data.syllabus[selectedModuleIndex].lessons.map(
                      (lesson, lessonIndex) => (
                        <div
                          key={lessonIndex}
                          className="p-4 border rounded-md space-y-4"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Lesson Title
                              </label>
                              <input
                                type="text"
                                value={lesson.title}
                                onChange={(e) =>
                                  updateLesson(selectedModuleIndex, lessonIndex, {
                                    title: e.target.value,
                                  })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Duration
                              </label>
                              <input
                                type="text"
                                value={lesson.duration}
                                onChange={(e) =>
                                  updateLesson(selectedModuleIndex, lessonIndex, {
                                    duration: e.target.value,
                                  })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="e.g., 30 minutes"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Lesson Type
                              </label>
                              <select
                                value={lesson.type}
                                onChange={(e) =>
                                  updateLesson(selectedModuleIndex, lessonIndex, {
                                    type: e.target.value,
                                    content: { type: e.target.value },
                                  })
                                }
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              >
                                <option value="video">Video</option>
                                <option value="quiz">Quiz</option>
                                <option value="assignment">Assignment</option>
                              </select>
                            </div>
                            <div className="flex items-center space-x-2 pt-6">
                              <input
                                type="checkbox"
                                id={`preview-${lessonIndex}`}
                                checked={lesson.isPreview}
                                onChange={(e) =>
                                  updateLesson(selectedModuleIndex, lessonIndex, {
                                    isPreview: e.target.checked,
                                  })
                                }
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <label
                                htmlFor={`preview-${lessonIndex}`}
                                className="text-sm text-gray-700"
                              >
                                Available as Preview
                              </label>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              removeLesson(selectedModuleIndex, lessonIndex)
                            }
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Remove Lesson
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <button
                  onClick={() => removeModule(selectedModuleIndex)}
                  className="text-red-600 hover:text-red-700"
                >
                  Delete Module
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Next: Preview Course
        </button>
      </div>
    </div>
  );
}
