import { Title } from "@components/core/title";

import * as styles from "./styles/home-page.css";

export const HomePage = () => {
  return (
    <div className={styles.containerPageStyles}>
      <Title.Root size="medium">
        <Title.Text>HOME</Title.Text>
      </Title.Root>
    </div>
  );
};
