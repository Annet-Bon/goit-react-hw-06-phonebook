import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../redux/phonebook-actions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContactListItem from '../ContactListItem';

import styles from './contactList.module.css';

function ContactList ({ contacts, onDeleteContact}) {
    return(
        <TransitionGroup className={styles.list} component="ul">
            {contacts.map(contact => (
                <CSSTransition
                    key={contact.id}
                    timeout={250}
                    classNames={styles}
                >
                    <li className={styles.item}>
                        <ContactListItem contact={contact} onDeleteContact={onDeleteContact}/>
                    </li>
                </CSSTransition>
            ))}
        </TransitionGroup>
    );
};

ContactList.propTypes = {
	contacts: PropTypes.array,
    onDeleteContact: PropTypes.func.isRequired,
};

const getFilteredContacts = (allContacts, filter) => {
    return allContacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
};

const mapStateToProps = ({ contacts: { items, filter } }) => {
    return {
        contacts: getFilteredContacts(items, filter),
    };
};

const mapDispatchToProps = dispatch => ({
    onDeleteContact: (id) => dispatch(actions.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);