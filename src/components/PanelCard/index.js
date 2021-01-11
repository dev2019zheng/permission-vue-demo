import "./index.less";

export default {
  functional: true,
  render(h, context) {
    const { slots, props, data = {} } = context;
    const { title: titleLabel, width, prefix = true } = props;
    const title = titleLabel || slots().title;
    // eslint-disable-next-line no-prototype-builtins
    const border = props.hasOwnProperty("border");

    // merge class and style
    const {
      staticClass = "",
      class: dynamicClass = {},
      style = {},
      staticStyle = {}
    } = data;
    const _cs = {
      [`panel-card${border ? " panel-card-bordered" : ""}${
        staticClass ? " " + staticClass : ""
      }`]: true,
      ...dynamicClass
    };
    const _style = {
      ...staticStyle,
      ...style
    };
    if (width) {
      _style.width = width;
    }

    return (
      <div class={_cs} style={_style}>
        <div class="panel-card-head">
          {title ? (
            <div class="panel-card-head-wrapper">
              <div class="panel-card-head-title">
                {prefix ? <span class="panel-card-head-title-prefix" /> : null}
                <span class="panel-card-head-title-label">{title}</span>
              </div>
            </div>
          ) : null}
        </div>
        <div class="panel-card-body">{slots().default}</div>
      </div>
    );
  }
};
