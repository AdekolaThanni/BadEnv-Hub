//@ts-nocheck
import "@fortawesome/fontawesome-free/css/all.css";
import { Meta } from "@/layout/Meta";
import { Main } from "@/templates/Main";
import React, { FC } from "react";
import _ from "lodash";
import { useRouter } from "next/router";
import BountyApp from "@/components/BountyApp";

const Dashboard: FC = ({}: any) => {
  //@ts-ignore
  const router = useRouter();

  return (
    <Main key="home" meta={<Meta title="BAD* Environment Hub" description="" />}>
      <BountyApp></BountyApp>
    </Main>
  );
};

export default Dashboard;
