import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyContents = () => {
  const [contents, setContents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({ id: '', date: '', content: '' });
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState(null);
  const username = localStorage.getItem('username');

  useEffect(() => {
    console.log("s",username);
    axios.get(`task-sp-production.up.railway.app/content/${username}`) 
      .then(response => {
        console.log(response);
        console.log(response.data);
        setContents(response.data);
      })
      .catch(error => {
        console.error('Error fetching contents:', error);
      });
  }, [username]);

  const handleUpdate = (id) => {
    const contentToUpdate = contents.find(content => content._id === id);
    setEditedData({ id: contentToUpdate._id, date: contentToUpdate.date, content: contentToUpdate.content });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    setContentToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`task-sp-production.up.railway.app/content/delete/${contentToDelete}`);
      setContents(prevContents => prevContents.filter(content => content._id !== contentToDelete));
      console.log(`Content with ID ${contentToDelete} deleted successfully`);
    } catch (error) {
      console.error('Error deleting content:', error);
    }
    setDeleteConfirmationOpen(false);
  };

  const handleModalSubmit = async () => {
    try {
      await axios.put(`task-sp-production.up.railway.app/content/update/${editedData.id}`, { date: editedData.date, content: editedData.content });
      setModalOpen(false);
      // Refresh contents after update (optional)
      const updatedContents = await axios.get('task-sp-production.up.railway.app/content/');
      setContents(updatedContents.data);
      console.log(`Content with ID ${editedData.id} updated successfully`);
    } catch (error) {
      console.error('Error updating content:', error);
    }
  };

  return (
    
    <div className="w-full overflow-x-auto m-8" >
      <table className="w-full bg-white divide-y divide-gray-200 rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th scope="col" className="text-center px-6 py-3 text-left text-sm font-bold tracking-wider uppercase">
              Date
            </th>
            <th scope="col" className="text-center px-6 py-3 text-left text-sm font-bold tracking-wider uppercase">
              Contents
            </th>
            <th scope="col" className="pr-8 text-end px-6 py-3 text-left text-sm font-bold tracking-wider uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {contents.map(content => (
            <tr key={content._id} className="bg-gray-50 hover:bg-gray-100">
              <td className="px-6 py-4  text-sm text-gray-900 ">{content.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{content.content}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleUpdate(content._id)}
                  className="text-indigo-600 hover:text-indigo-900 mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(content._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Edit Content
                    </h3>
                    <div className="mt-2 w-full">
                      <div className="mb-4">
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                          Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={editedData.date}
                          onChange={(e) => setEditedData({ ...editedData, date: e.target.value })}
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                          Content
                        </label>
                        <textarea
                          id="content"
                          name="content"
                          value={editedData.content}
                          onChange={(e) => setEditedData({ ...editedData, content: e.target.value })}
                          rows="4"
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleModalSubmit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update
                </button> 
                <button
                  onClick={() => setModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}{deleteConfirmationOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Delete Confirmation
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Are you sure you want to delete this content?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={confirmDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button> 
                <button
                  onClick={() => setDeleteConfirmationOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
   
  );
};

export default MyContents;
