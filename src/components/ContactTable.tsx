import {  JSXElementConstructor, ReactElement, SetStateAction, useEffect, useMemo, useState } from "react";
import { Box, Button, ButtonGroup, Icon, Text, Flex } from "@chakra-ui/react";
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import Filters from "./Filters";
import SortIcon from "./icons/SortIcon";
import DeleteCell from "./DeleteCell";
import EditCell from "./EditCell";
import { useGetContacts } from "../hooks/useGetContacts";
import { useNavigate } from "react-router-dom";
import CustomModal from "./CustomModal";
import { Contact } from "../types/contact";

const ContactTable = () => {

	const columns:any = useMemo(
		() => [
			{
				accessorKey: "firstName",
				header: "First Name",
				cell: (props: { getValue: () =>  ReactElement<any, string | JSXElementConstructor<any>>; }) => <p style={{textAlign:"center"}}>{props.getValue()}</p>,
				enableColumnFilter: true,
				enableSorting: true,
				filterFn: "includesString",
			},
			{
				accessorKey: "lastName",
				header: "Last Name",
				cell: (props: { getValue: () =>  ReactElement<any, string | JSXElementConstructor<any>>; }) => <p style={{textAlign:"center"}}>{props.getValue()}</p>,
				enableColumnFilter: true,
				enableSorting: true,
				filterFn: "includesString",
			},
			{
				accessorKey: "country",
				header: "Country",
				cell: (props: { getValue: () =>  ReactElement<any, string | JSXElementConstructor<any>>; }) => <p style={{textAlign:"center"}}>{props.getValue()}</p>,
				enableSorting: true,
			},
			{
				accessorKey: "city",
				header: "City",
				cell: (props: { getValue: () =>  ReactElement<any, string | JSXElementConstructor<any>>; }) => <p style={{textAlign:"center"}}>{props.getValue()}</p>,
				enableSorting: true,
			},
			{
				accessorKey: "street",
				header: "Street",
				cell: (props: { getValue: () =>  ReactElement<any, string | JSXElementConstructor<any>> ; }) => <p style={{textAlign:"center"}}>{props.getValue()}</p>,
				enableSorting: false,
			},
			{
				accessorKey: "zipCode",
				header: "Zip Code",
				cell: (props: { getValue: () =>  ReactElement<any, string | JSXElementConstructor<any>>; }) => <p style={{textAlign:"center"}}>{props.getValue()}</p>,
				enableSorting: false,
			},
			{
				accessorKey: "phone",
				header: "Phone",
				cell: (props: { getValue: () =>  ReactElement<any, string | JSXElementConstructor<any>>; }) => <p style={{textAlign:"center"}}>{props.getValue()}</p>,
				enableSorting: false,
			},
			{
				accessorKey: "email",
				header: "Email",
				cell: (props: { getValue: () =>  ReactElement<any, string | JSXElementConstructor<any>>; }) => <p style={{textAlign:"center"}}>{props.getValue()}</p>,
				enableSorting: false,
			},
			{
				accessorKey: "edit",
				header: "Edit",
				cell: (props: { row: { original: Contact; }; }) => <EditCell contact={props.row.original} />,
				enableSorting: false,
			},
			{
				accessorKey: "delete",
				header: "Delete",
				cell: (props: { row: { original: { id: number; }; }; }) => <DeleteCell onOpenModal={onOpenModal} contactId={props.row.original.id} />,
				enableSorting: false,
			},
		],
		[]
	);

	const { data: contacts } = useGetContacts();

	const [data, setData] = useState([]);
	const [columnFilters, setColumnFilters] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalMessage, setmodalMessage] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		if (contacts) setData(contacts.contacts);
	}, [contacts]);

	const onOpenModal = (title: SetStateAction<string>, message: SetStateAction<string>) => {
		setModalTitle(title);
		setmodalMessage(message);
		setIsModalOpen(true);
	};

	const onCloseModal = () => {
		setIsModalOpen(false);
	};

	const table = useReactTable({
		data,
		columns,
		state: {
			columnFilters,
		},
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		columnResizeMode: "onChange",
		meta: {
			updateData: (rowIndex: number, columnId: any, value: any) =>
				setData((prev) =>
					prev.map((row, index) =>
						index === rowIndex
							? {
									...prev[rowIndex],
									[columnId]: value,
							  }
							: row
					)
				),
		},
	});

	return (
		<Flex direction="column" align="center" justify="center">
			<Filters columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
			<Box className="table" w={table.getTotalSize()}>
				{table.getHeaderGroups().map((headerGroup) => (
					<Box className="tr" key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<Box className="th" w={header.getSize()} key={header.id}>
								{header.column.columnDef.header.toString()}
								{header.column.getCanSort() && (
									<Icon
										as={SortIcon}
										mx={3}
										fontSize={14}
										onClick={header.column.getToggleSortingHandler()}
										__css={{
											"@media screen and (max-width: 640px)":{
											  fontSize: "4px"
											}
										  }}
									/>
								)}
								{
									{
										asc: " 🔼",
										desc: " 🔽",
									}[header.column.getIsSorted()?.toString() || ""] as string
								}
								<Box
									onMouseDown={header.getResizeHandler()}
									onTouchStart={header.getResizeHandler()}
									className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""}`}
								/>
							</Box>
						))}
					</Box>
				))}
				{table.getRowModel().rows.map((row) => (
					<Box className="tr" key={row.id}>
						{row.getVisibleCells().map((cell) => (
							<Box className="td" w={cell.column.getSize()} key={cell.id}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</Box>
						))}
					</Box>
				))}
			</Box>
			<br />
			<Text mb={2}>
				Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
			</Text>
			<ButtonGroup size="sm" isAttached>
				<Button
					onClick={() => table.previousPage()}
					isDisabled={!table.getCanPreviousPage()}
					textColor={"#a1a4ac"}
					backgroundColor={"#252730"}
				>
					{"<"}
				</Button>
				<Button
					onClick={() => table.nextPage()}
					isDisabled={!table.getCanNextPage()}
					textColor={"#a1a4ac"}
					backgroundColor={"#252730"}
				>
					{">"}
				</Button>
			</ButtonGroup>
			<br />
			<Button
				mx="auto"
				p={3}
				onClick={() => navigate("/contactForm")}
				textColor={"white"}
				colorScheme="teal"
			>
				Create New Contact
			</Button>
			{isModalOpen && <CustomModal onClose={onCloseModal} title={modalTitle} message={modalMessage} />}
		</Flex>
	);
};
export default ContactTable;
