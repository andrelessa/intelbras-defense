import { Header } from "@components/core/header";
import { Sidebar } from "@components/core/sidebar";
import { Title } from "@components/core/title";
import { MENU_RESOURCES_CONFIGS } from "@config/menu";
import { ReactNode } from "react";
import * as styles from "./styles.css";
import Link from "next/link";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <main className={styles.homeLayoutStyle}>
      <Sidebar.Root>
        <Sidebar.Menu resources={MENU_RESOURCES_CONFIGS} />
      </Sidebar.Root>
      <div className={styles.containerPageStyles}>
        <Header.Root className={styles.header}>
          <Header.RightGroup className={styles.rightGroup}></Header.RightGroup>
        </Header.Root>
        {children}
        <Header.LeftGroup className={styles.leftGroup}>
          <Title.Root size="small">
            <Title.Text>
              <Link href="/centrais">Centrais</Link>
            </Title.Text>
          </Title.Root>
        </Header.LeftGroup>
      </div>
    </main>
  );
}
