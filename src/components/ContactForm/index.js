import { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../redux/phonebook-actions';

import Alert from '../Alert/index';

import alertStyles from '../Alert/fadeAlert.module.css';
import styles from './contactForm.module.css';

class ContactForm extends Component {
    static propTypes = {
		name: PropTypes.string,
		number: PropTypes.number,
		onChange: PropTypes.func,
		onSubmit: PropTypes.func,
	};

    state = {
        name: '',
        number: '',
        error: false,
        alert: '',
    };

    onChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    };

    onSubmit = event => {
        event.preventDefault();

        const { name, number } = this.state;
        const contacts = this.props.contacts;

        if (contacts.some(contact => contact.name === name)) {
            this.addAlertMessage(`${name} is already in contacts`);
            this.reset();
            return;
        }

        this.props.onSubmit(name, number);
        this.reset();
    }

    addAlertMessage = text => {
		this.setState({
			error: true,
			alert: text,
		});
		setTimeout(() => this.setState({
			error: false
		}), 1500);
	}

    reset () {
        this.setState({
            name: '',
            number: '',
        });
    }

    render() {
        const { name, number, error, alert } = this.state;

        return (
            <>
                <CSSTransition
					in={error}
					classNames={alertStyles}
					timeout={250}
					unmountOnExit
				>
          			<Alert message={alert}/>
        		</CSSTransition>
            <form onSubmit={this.onSubmit} className={styles.form}>
                <label className={styles.label}>
                    <span className={styles.title}>Name</span>
                    <input
                        className={styles.input}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        value={name}
                        onChange={this.onChange}
                        required
                    />
                </label>

                <label className={styles.label}>
                    <span className={styles.title}>Number</span>
                    <input
                        className={styles.input}
                        type="tel"
                        name="number"
                        pattern="(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){7,14}(\s*)?"
                        value={number}
                        onChange={this.onChange}
                        required
                    />
                </label>

                <button type="submit" className={styles.btn}>Add new contact</button>
            </form>
            </>
        );
    }
}

const mapStateToProps = state => ({
    contacts: state.contacts.items,
});

const mapDispatchToProps = dispatch => ({
    onSubmit: (name, number) => dispatch(actions.addContact(name, number))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);