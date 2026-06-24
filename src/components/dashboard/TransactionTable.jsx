"use client";

import React from "react";
import { Table, Chip } from "@heroui/react";

const TransactionTable = ({
  transactions,
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border">
      <Table aria-label="Transaction History">
        <Table.ScrollContainer>
          <Table.Content className="min-w-[900px]">

            <Table.Header>
              <Table.Column isRowHeader>
                Transaction ID
              </Table.Column>

              <Table.Column>
                Ticket Title
              </Table.Column>

              <Table.Column>
                Amount
              </Table.Column>

              <Table.Column>
                Payment Date
              </Table.Column>

              <Table.Column>
                Status
              </Table.Column>
            </Table.Header>

            <Table.Body
              emptyContent="No transactions found."
            >
              {transactions.map(
                (transaction) => (
                  <Table.Row
                    key={transaction._id}
                  >
                    <Table.Cell>
                      {transaction._id}
                    </Table.Cell>

                    <Table.Cell>
                      {
                        transaction.ticketTitle
                      }
                    </Table.Cell>

                    <Table.Cell>
                      ৳
                      {
                        transaction.totalPrice
                      }
                    </Table.Cell>

                    <Table.Cell>
                      {transaction.paidAt
                        ? new Date(
                            transaction.paidAt
                          ).toLocaleString()
                        : "-"}
                    </Table.Cell>

                    <Table.Cell>
                      <Chip
                        color="success"
                        size="sm"
                        variant="flat"
                      >
                        Paid
                      </Chip>
                    </Table.Cell>
                  </Table.Row>
                )
              )}
            </Table.Body>

          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default TransactionTable;