import { Component } from 'react';
import { signUp } from '../../utilities/users-service';
import { Button } from '@nextui-org/react';
export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const {name, email, password} = this.state;
      const formData = {name, email, password};
      // The promise returned by the signUp service
      // method will resolve to the user object included
      // in the payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      // An error occurred
      // Probably due to a duplicate email
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="bg-black bg-opacity-70 p-20 rounded-xl">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label className='text-white font-bold'>Name</label>
            <input className='bg-white'   type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label  className='text-white font-bold'>Email</label>
            <input  className='bg-white'  type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            <label  className='text-white font-bold'>Password</label>
            <input className='bg-white'   type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label  className='text-white font-bold'>Confirm</label>
            <input className='bg-white'   type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <Button className='w-20 ' color='primary' variant="ghost" type="submit" disabled={disable}>SIGN UP</Button>
          </form>
          <div className='flex items-center'>
          <p>Already have an account?</p>
          <Button className='bg-transparent border-none font-bold text-blue-600 ml-2' onClick={() => this.props.setShowSignUp(!this.props.showSignUp)}>{this.props.showSignUp ? 'Log In' : 'Sign Up'}</Button>
          </div>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}