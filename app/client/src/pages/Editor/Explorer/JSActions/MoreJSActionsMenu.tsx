import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "reducers";

import {
  moveJSActionRequest,
  copyJSActionRequest,
  deleteJSAction,
} from "actions/jsActionActions";

import { ContextMenuPopoverModifiers } from "../helpers";
import { noop } from "lodash";
import TreeDropdown from "components/ads/TreeDropdown";
import { useNewJSActionName } from "./helpers";
import styled from "styled-components";
import Icon, { IconSize } from "components/ads/Icon";

type EntityContextMenuProps = {
  id: string;
  name: string;
  className?: string;
  pageId: string;
};

export const MoreActionablesContainer = styled.div<{ isOpen?: boolean }>`
  width: 34px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  &&&& span {
    width: auto;
  }

  &&&& svg > path {
    fill: ${(props) => props.theme.colors.treeDropdown.targetIcon.normal};
  }

  ${(props) =>
    props.isOpen
      ? `
		background-color: ${props.theme.colors.treeDropdown.targetBg};

    &&&& svg > path {
      fill: ${props.theme.colors.treeDropdown.targetIcon.hover};
    }
	`
      : null}

  &:hover {
    background-color: ${(props) => props.theme.colors.treeDropdown.targetBg};

    &&&& svg > path {
      fill: ${(props) => props.theme.colors.treeDropdown.targetIcon.hover};
    }
  }
`;

export function MoreJSActionsMenu(props: EntityContextMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const nextEntityName = useNewJSActionName();

  const dispatch = useDispatch();
  const copyJSActionToPage = useCallback(
    (actionId: string, actionName: string, pageId: string) =>
      dispatch(
        copyJSActionRequest({
          id: actionId,
          destinationPageId: pageId,
          name: nextEntityName(`${actionName}Copy`, pageId),
        }),
      ),
    [dispatch, nextEntityName],
  );
  const moveJSActionToPage = useCallback(
    (actionId: string, actionName: string, destinationPageId: string) =>
      dispatch(
        moveJSActionRequest({
          id: actionId,
          destinationPageId,
          originalPageId: props.pageId,
          name: nextEntityName(actionName, destinationPageId),
        }),
      ),
    [dispatch, nextEntityName, props.pageId],
  );
  const deleteJSActionFromPage = useCallback(
    (actionId: string, actionName: string) =>
      dispatch(deleteJSAction({ id: actionId, name: actionName })),
    [dispatch],
  );

  const menuPages = useSelector((state: AppState) => {
    return state.entities.pageList.pages.map((page) => ({
      label: page.pageName,
      id: page.pageId,
      value: page.pageName,
    }));
  });

  return (
    <TreeDropdown
      className={props.className}
      defaultText=""
      modifiers={ContextMenuPopoverModifiers}
      onMenuToggle={(isOpen: boolean) => setIsMenuOpen(isOpen)}
      onSelect={noop}
      optionTree={[
        {
          icon: "duplicate",
          value: "copy",
          onSelect: noop,
          label: "Copy to page",
          children: menuPages.map((page) => {
            return {
              ...page,
              onSelect: () => copyJSActionToPage(props.id, props.name, page.id),
            };
          }),
        },
        {
          icon: "swap-horizontal",
          value: "move",
          onSelect: noop,
          label: "Move to page",
          children:
            menuPages.length > 1
              ? menuPages
                  .filter((page) => page.id !== props.pageId) // Remove current page from the list
                  .map((page) => {
                    return {
                      ...page,
                      onSelect: () =>
                        moveJSActionToPage(props.id, props.name, page.id),
                    };
                  })
              : [{ value: "No Pages", onSelect: noop, label: "No Pages" }],
        },
        {
          icon: "trash",
          value: "delete",
          onSelect: () => deleteJSActionFromPage(props.id, props.name),
          label: "Delete",
          intent: "danger",
          className: "t--apiFormDeleteBtn",
        },
      ]}
      selectedValue=""
      toggle={
        <MoreActionablesContainer
          className={props.className}
          isOpen={isMenuOpen}
        >
          <Icon name="context-menu" size={IconSize.XXXL} />
        </MoreActionablesContainer>
      }
    />
  );
}

export default MoreJSActionsMenu;
