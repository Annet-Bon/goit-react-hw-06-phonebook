import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../redux/phonebook-actions';

import styles from './filter.module.css';

function Filter ({ value, onChangeFilter }) {
    return (
        <div className={styles.filter}>
            <p className={styles.title}>Find contacts by name</p>
            <input
                className={styles.filterInput}
                name="filter"
                onChange={onChangeFilter}
                value={value}
            />
        </div>
    );
};

Filter.propTypes = {
	value: PropTypes.string.isRequired,
    onChangeFilter: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    value: state.contacts.filter,
});

const mapDispatchToProps = dispatch => ({
    onChangeFilter: event => dispatch(actions.changeFilter(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);