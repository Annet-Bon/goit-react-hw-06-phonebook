import PropTypes from 'prop-types';

import styles from './contactListItem.module.css';

export default function ContactListItem ({ contact, onDeleteContact }) {
    return(
        <>
            <span className={styles.contact}>
                {contact.name}: {contact.number}
            </span>
            <button className={styles.button} onClick= {()=>onDeleteContact(contact.id)}>Delete</button>
        </>
    );
};

ContactListItem.propTypes = {
	contact: PropTypes.object,
    onDeleteContact: PropTypes.func.isRequired,
};