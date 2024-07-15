import { Modal } from 'react-bootstrap';
import { Button } from '.';
import { Field, Form, Formik } from 'formik';
import { Textarea } from './Fields';
import { Fieldset } from './Formik';
import * as Yup from 'yup';
import { applyForJob } from '../api/user';
import { useMutation } from '../hooks';
import SubmitButton from './SumbitButton';

const ApplyModal = ({ isOpen, hide, post, refetch }) => {
  const mutation = useMutation(applyForJob, {
    invalidateQueries: '/user/posts',
  });

  const validationSchema = Yup.object().shape({
    message: Yup.string().required(),
  });

  const initialValues = {
    message: '',
  };
  async function handleSubmit(id, values) {
    values._id = id;
    await mutation.mutateAsync(values);
    refetch();
    hide();
  }

  return (
    <Modal centered show={isOpen} onHide={hide}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form debug={true}>
          <Modal.Header closeButton>
            <Modal.Title>Apply for this job</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Fieldset name="message" label="Write your message">
                <Field id="message" name="message" as={Textarea} autoFocus />
              </Fieldset>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="button full secondary" onClick={hide}>
              Go back
            </Button>
            <SubmitButton post={post} handleSubmit={handleSubmit} />
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
};

export default ApplyModal;
