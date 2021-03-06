import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Button, Icon, Table } from "semantic-ui-react";

import { deleteTransaction } from '../data/actions/transactionsActions';
import DeleteTransactionDialog from '../components/DeleteTransactionDialog';

class TransactionsTable extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      deleteId: 0,
      deleteTransactionDialogOpen: false,
    }
  };

  handleDeleteDialog = (id) => {
    this.setState({ deleteId: id });
    this.setState(state => ({ deleteTransactionDialogOpen: !state.deleteTransactionDialogOpen }));
  };

  handleDelete = (id) => {
    this.props.deleteTransaction(id);
  }
  
  dataHasLoaded = () => this.props.transactions.transactions.length > 0;

  render() {
    const { getAmount, transactions } =this.props;
    const { deleteTransactionDialogOpen, deleteId } = this.state;

    return (
      <div>
        {this.dataHasLoaded() ? (
          <Table celled striped selectable sortable={true}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Merchant</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {transactions.transactions.map(transaction => {
                return (
                  <Table.Row key={transaction.id}>
                    <Table.Cell width="3">{transaction.category}</Table.Cell>
                    <Table.Cell>{transaction.name}</Table.Cell>
                    <Table.Cell> {transaction.merchant} </Table.Cell>
                    <Table.Cell>{getAmount(transaction.amount)}</Table.Cell>
                    <Table.Cell>{transaction.description}</Table.Cell>
                    <Table.Cell collapsing>
                      <Button 
                        icon
                        basic
                        color="red"
                        onClick={() => this.handleDeleteDialog(transaction.id)}
                      >
                        <Icon color="red" name="trash alternate outline" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        ) : (
          <div>
            Oh no! No data available! Add transaction data with the form so you will be Poor No More!
          </div>
        )}
        <DeleteTransactionDialog 
          openDialog={deleteTransactionDialogOpen}
          alertTitle={"Delete Transaction"}
          alertDescription={"Are you sure? This will delete your transaction."}
          onConfirm={() => this.handleDelete(deleteId)} 
          closeDialog={this.handleDeleteDialog} 
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
  deleteTransaction: id => dispatch(deleteTransaction(id))
});

TransactionsTable.propTypes = {
  deleteTransaction: PropTypes.func,
  getAmount: PropTypes.func,
  isAmountRoman: PropTypes.bool,
  transactions: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsTable);

