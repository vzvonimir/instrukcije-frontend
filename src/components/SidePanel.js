import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/sidepanel.css';
import { FiSearch } from 'react-icons/fi';

function SidePanel() {
    return (
      <div className="custom-sidepanel">
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="success"><FiSearch size={18} /></Button>
          </Form>
          <hr />
      <p>This is some text in the side panel.</p>
      <p>This is some text in the side panel.</p>
      <p>This is some text in the side panel.</p>
      <p>This is some text in the side panel.</p>
      <p>This is some text in the side panel.</p>
      <p>This is some text in the side panel.</p>
      <p>This is some text in the side panel.</p>
      </div>
    );
}

export default SidePanel;