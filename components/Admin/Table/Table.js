"use client";
import Button from "@/components/Button/Button";
import LinkItem from "@/components/Header/LinkItem/LinkItem";
import { deleteData } from "@/lib/handleApiActions";
import table from "@/styles/table.module.scss";
import Link from "next/link";
export default function Table({ data, th, handleDelete, createSlug }) {
  return (
    <table className={table.table}>
      <thead className={table.thead}>
        <tr>
          {th.map((item) => (
            <th className={table.th} key={item}>
              {item}
            </th>
          ))}
          <th className={table.th}>Action</th>
          <th className={table.th}>
            <Link
              className={`${table.actionBtn} ${table.create}`}
              href={createSlug}
            >
              Create
            </Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className={table.trHover}>
            <td className={table.td}>{row.name}</td>
            <td className={table.td}>
              <Button className={`${table.actionBtn} ${table.edit}`}>
                Edit
              </Button>
              <Button
                className={`${table.actionBtn} ${table.delete}`}
                onClick={() => handleDelete(row.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
