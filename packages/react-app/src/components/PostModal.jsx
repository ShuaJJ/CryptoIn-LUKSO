import { Modal, Input } from 'antd';
const { TextArea } = Input;

const PostModal = ({isModalVisible, handleOk, handleCancel}) => {

    const onChange = (e) => {
        console.log('Change:', e.target.value);
      };

  return (
    <Modal title="Post something about your work or project" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <TextArea showCount maxLength={300} style={{ height: 100 }} onChange={onChange} />
    </Modal>
  );
};

export default PostModal;