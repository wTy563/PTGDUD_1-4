import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { motion } from 'framer-motion';
import UserDetails from './UserDetails';
import { Card, Pagination } from 'react-bootstrap';

const UserList = () => {
  const { users, loading } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Lọc người dùng theo tên tìm kiếm
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Tính toán số lượng trang
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Lấy ra những người dùng hiển thị trên trang hiện tại
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Hàm chuyển trang
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Tìm kiếm..."
        className="border p-2 w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
      ) : (
        <>
          <div className="d-flex flex-wrap gap-4">
            {currentUsers.map((user) => (
              <motion.div
                key={user.id}
                className="card shadow-lg"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedUser(user)}
                style={{ width: '18rem', cursor: 'pointer' }}
              >
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>Email: {user.email}</Card.Text>
                  <Card.Text>City: {user.address.city}</Card.Text>
                </Card.Body>
              </motion.div>
            ))}
          </div>

          {/* Phân trang */}
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.Prev onClick={previousPage} disabled={currentPage === 1} />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={nextPage} disabled={currentPage === totalPages} />
            </Pagination>
          </div>
        </>
      )}
      {selectedUser && (
        <UserDetails user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default UserList;
