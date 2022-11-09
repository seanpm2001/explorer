import {
    useTable, useSortBy,
    usePagination, TableInstance,
    UsePaginationInstanceProps,
    UsePaginationState, UsePaginationOptions,
    UseSortByInstanceProps,
} from 'react-table'
import BTable from 'react-bootstrap/Table'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";



export type TableInstanceWithHooks<T extends object> = TableInstance<T> &
    UsePaginationInstanceProps<T> & UsePaginationOptions<T> &
{ state: UsePaginationState<T> } &
    UseSortByInstanceProps<T> & {
        state: UsePaginationState<T>;
    };

type ColumnWithAccessorDescriptor<T, K extends keyof T> = {
    Header: string
    accessor: K
    Cell?: React.FC<{ value: T[K] }>
}

export function column<C>(
    header: string,
    accessor: keyof C,
    cell?: React.FC<{ value: C[typeof accessor] }>
) {
    if (cell === undefined) {
        return {
            Header: header,
            accessor,
        }
    } else {
        return {
            Header: header,
            accessor,
            Cell: cell,
        }
    }
}

type TableProps<T> = {

    columns: ColumnWithAccessorDescriptor<T, keyof T>[]
    data: T[]
    className?: string
    id?: string
    pageCount?: any
    fetchData?: any
    loading?: any
    isPaginated?: boolean
    pSize?: number
    showPaginationCus?: any
    noOfRec?: number[]
    sortBy?: any
}

/* interface Props {
    columns: Array<Column<object>>;
    data: Array<object>;
} */
/* const Table: React.FC<Props> = ({ columns, data }) => { */
export default function TablewithSorting<T extends object>(props: TableProps<T>) {
    const { columns, data, className = '', id = '', pSize = 10, showPaginationCus, noOfRec = [10], sortBy } = props
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        setPageSize,
        prepareRow,
        state: { pageSize },
        setSortBy

    } = useTable({
        columns,
        data,

    },
        useSortBy,
        usePagination,
    ) as TableInstanceWithHooks<T>;
    const [skipCount, setSkipCount] = useState(0);
    useEffect(() => {
        setPageSize(pSize)
    }, [pSize]);
    const btableProps = {
        responsive: true,
        bordered: true,
        hover: true,
        ...getTableProps(),
        className: `border ${className}`,
        id: id || undefined,
    }
    const myRef: any = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (skipCount) {
            myRef.current!.scrollIntoView();
        }
    });
    // We don't want to render all 2000 rows for this example, so cap
    // it at 20 for this use case
    //const firstPageRows = rows.slice(0, 20);

    return (
        <div  >
            <div ref={myRef} className='d-flex justify-content-end cmb-15'>
                {showPaginationCus && <Form.Group as={Row} className="mb-6" controlId="formHorizontalEmail">
                    <Col sm={12}>
                        <Form.Select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number((e.target as HTMLInputElement).value))
                            }}
                        >
                            {noOfRec.map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                </Form.Group>}
            </div>
            <BTable {...btableProps}>
                <thead>
                    {headerGroups.map((headerGroup, hgIndex: number) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={`header-group-${hgIndex}`}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} key={`header-${column.Header}`}>
                                    {column.render("Header")}
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? " 🔽"
                                                : " 🔼"
                                            : ""}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.length > 0 ? page.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} key={`row-${row.id}`} role='menuitem'>
                                {row.cells.map((cell, cellIndex) => {
                                    return (
                                        <td {...cell.getCellProps()} key={`cell-${cellIndex}`}>
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    }) : <tr><td colSpan={columns.length} className="text-center">No Data Available</td></tr>}
                </tbody>
            </BTable>
            <br />

            {showPaginationCus && <div className="m-20 text-center">
                {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {"<<"}
      </button> */}
                {canPreviousPage && <Button className="tbl-nav" variant="light" onClick={() => { setSkipCount(skipCount + 1); previousPage() }} disabled={!canPreviousPage}>
                    <FaAngleLeft /> Previous
                </Button>}
                {canNextPage && <Button className="tbl-nav" variant="light" onClick={() => { setSkipCount(skipCount + 1); nextPage() }} disabled={!canNextPage}>
                    Next <FaAngleRight />
                </Button>}
                {/* <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {">>"}
      </button> */}
                {/* <span>
        Page 
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong> 
      </span>
      <span>
        | Go to page: 
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const pageNumber = e.target.value
              ? Number(e.target.value) - 1
              : 0;
            gotoPage(pageNumber);
          }}
          style={{ width: "50px" }}
        />
      </span> */}

            </div>}
        </div>
    );
};

/* function TableWithSorting(columns) {


    return (
        <Styles>
            <Table columns={columns} data={data} />
        </Styles>
    );
}

export default TableWithSorting; */
