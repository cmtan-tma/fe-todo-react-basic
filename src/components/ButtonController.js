const ButtonController = (props) => {
    const tabStr = props.tabType.toLowerCase();
    return (
      <div>                
        <p className='icon-control icon' onClick={() => props.changeTab(props.tabType)}>{props.children}</p>
        <p>{tabStr}</p>
    </div>
    );
  }

  export default ButtonController;
