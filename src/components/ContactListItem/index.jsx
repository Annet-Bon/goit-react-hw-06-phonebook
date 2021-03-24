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
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }),
    ),
    onDeleteContact: PropTypes.func.isRequired,
};