"use client";

import Link from "next/link";
import { FC } from "react";

import { Accordion } from "@components/core/accordion";
import { Highlight } from "@components/core/highlight";
import { ChevronDownIcon } from "@components/icons/chevron-down";
import { FragmentedSidebarMenu } from "./fragments";
import * as styles from "./styles/sidebar-menu.css";
import { SideBarMenuProps } from "./types";

export const SidebarMenu: FC<SideBarMenuProps> = (props) => {
  const { resources, ...rest } = props;

  return (
    <Accordion.Root {...rest} className={styles.sidebarAccordionRootStyle}>
      {resources.map((resource) => {
        const { id, title, item, path, resourceGroup } = resource;

        if (resourceGroup) {
          return (
            <Accordion.Item
              key={id}
              id={id}
              className={styles.sidebarAccordionItemStyle}
            >
              <FragmentedSidebarMenu.Highlight
                className={styles.sidebarMenuItemTriggerStyle}
                path={path}
                asChild
              >
                <Accordion.Trigger>
                  <div className={styles.sidebarInicialTriggerStyle}>
                    <Accordion.TriggerItem
                      className={styles.sidebarAccordionTriggerItemStyle}
                    >
                      {item}
                    </Accordion.TriggerItem>
                    <Accordion.Text className={styles.sidebarTextStyle}>
                      {title}
                    </Accordion.Text>
                  </div>

                  <Accordion.TriggerFlag
                    className={styles.sidebarTriggerFlagStyle}
                  >
                    <ChevronDownIcon customSize="1.2rem" />
                  </Accordion.TriggerFlag>
                </Accordion.Trigger>
              </FragmentedSidebarMenu.Highlight>

              <Accordion.Content>
                {resourceGroup.map((subResource) => (
                  <FragmentedSidebarMenu.Highlight
                    key={subResource.id}
                    path={subResource.path}
                    className={styles.sidebarMenuSubItemStyle}
                  >
                    <Link href={subResource.path}>
                      <Highlight.Text asChild>
                        <Accordion.Text className={styles.sidebarTextStyle}>
                          {subResource.title}
                        </Accordion.Text>
                      </Highlight.Text>
                    </Link>
                  </FragmentedSidebarMenu.Highlight>
                ))}
              </Accordion.Content>
            </Accordion.Item>
          );
        }

        return (
          <FragmentedSidebarMenu.Highlight
            highlighted={false}
            key={id}
            path={path}
            className={styles.sidebarMenuItemLinkStyle}
          >
            <Link aria-disabled={true} href={path}>
              <Highlight.Item
                className={styles.sidebarAccordionTriggerItemStyle}
              >
                {item}
              </Highlight.Item>

              <Highlight.Text className={styles.sidebarTextStyle}>
                {title}
              </Highlight.Text>
            </Link>
          </FragmentedSidebarMenu.Highlight>
        );
      })}
    </Accordion.Root>
  );
};
