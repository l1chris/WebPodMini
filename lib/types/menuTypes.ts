export type MainMenuHandle = {
  updateIndex: (scrollDirection: string) => void
  updateMenu: (clickedButtonName: string) => void
}

export type SubMenuHandle = {
  updateIndex: (scrollDirection: string) => void
  handleSelect: (clickedButtonName: string) => void
}
