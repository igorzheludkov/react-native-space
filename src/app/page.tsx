"use client";

import { useGetUsersQuery } from "@/redux/services/userApi";
import { decrement, increment, reset } from "@/redux/features/counterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";

export default function Home() {
  const count = useAppSelector((state) => state.counterReducer.value);
  const dispatch = useAppDispatch();

  const { isLoading, isFetching, data, error } = useGetUsersQuery(null);

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      
    </main>
  );
}
