import React from 'react';
import api from '../../api.js';
import { QuestionModal } from './ModalForm.jsx';
import { Button } from '../Shared/Form';
import { formValidation } from './lib/dataFunctions';


class AddQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      name: '',
      email: '',
      show: false
    };

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.questionBody = this.questionBody.bind(this);
    this.nickNameOnChange = this.nickNameOnChange.bind(this);
    this.emailOnChange = this.emailOnChange.bind(this);
    this.submitQuestionForm = this.submitQuestionForm.bind(this);
  }

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  questionBody(e) {
    this.setState({
      question: e.target.value
    });
  }

  nickNameOnChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  emailOnChange(e) {
    this.setState({
      email: e.target.value
    });
  }

  submitQuestionForm() {
    let formData = {
      body: this.state.question,
      name: this.state.name,
      email: this.state.email,
      product_id: parseInt(this.props.product_id)
    };

    let currentErrors = formValidation(formData);

    // TODO: Ensure secondary get request makes sense with page and count number
    if (Object.keys(currentErrors).length === 0) {
      api.addQuestion(formData)
        .then(() => {
          this.props.fetchQuestionData({ product_id: this.props.product_id, page: 1,
            count: 100 });
          this.hideModal();
          alert ('Your question has submitted');
        });
    } else {
      alert('email must be in xxx@yyy.com format');
    }
  }

  render() {
    return (
      <div>
        {this.state.show && <QuestionModal
          product_name={this.props.product_name}
          handleClose={this.hideModal}
          questionBody={this.questionBody}
          nickName={this.nickNameOnChange}
          email={this.emailOnChange}
          submitQuestionForm={this.submitQuestionForm}
        />}
        <Button onClick={this.showModal}>ADD A QUESTION +</Button>
      </div>
    );
  }
}

export default AddQuestion;