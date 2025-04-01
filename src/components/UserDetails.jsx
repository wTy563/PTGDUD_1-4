import { Modal, Button, Card } from 'react-bootstrap';

const UserDetails = ({ user, onClose }) => {
  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết người dùng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center mb-4">
          <Card.Img
            variant="top"
            src={`https://i.pravatar.cc/150?img=${user.id}`} // Giả sử bạn có ID để tạo avatar ngẫu nhiên
            alt={`${user.name} Avatar`}
            className="rounded-circle"
            style={{ width: '150px', height: '150px' }}
          />
        </div>
        <div>
          <h3 className="text-center">{user.name}</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Website:</strong> {user.website}</p>
          <p><strong>Company:</strong> {user.company.name}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDetails;
