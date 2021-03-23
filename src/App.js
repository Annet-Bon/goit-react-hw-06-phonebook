import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
// js
import ContactForm from './components/ContactForm/index';
import Filter from './components/Filter/index';
import ContactList from './components/ContactList/index';

// css
import styles from './app.module.css';

import filterStyles from './components/Filter/fadeFilter.module.css';

const App = ({ contacts, clearFilter }) => {
	return (
		<div>
			<CSSTransition
				in={true}
				appear
				timeout={500}
				classNames={styles}
			>
				<h1 className={styles.title}>Phonebook</h1>
			</CSSTransition>

			<ContactForm />
				{contacts.length === 0
				? <p className={styles.nothing}>There are no contacts :((</p>
				: (
					<>
						<h2 className={styles.title}>Contacts</h2>

						<CSSTransition
							in={contacts.length > 1}
							timeout={500}
							classNames={filterStyles}
							unmountOnExit
						>
							<Filter />
						</CSSTransition>

						<ContactList />
					</>
				)}
		</div>
	);
};

const mapStateToProps = state => ({
	contacts: state.contacts.items,
});

export default connect(mapStateToProps, null)(App);