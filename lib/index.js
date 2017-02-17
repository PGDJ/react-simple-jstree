'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

require('jstree/dist/jstree.min');

require('jstree/dist/themes/default/style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeView = function (_Component) {
  _inherits(TreeView, _Component);

  function TreeView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TreeView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TreeView.__proto__ || Object.getPrototypeOf(TreeView)).call.apply(_ref, [this].concat(args))), _this), _this.addNode = function () {
      // console.log('add')
      // console.log(this.props.selectedNode)
      // let node = $('#data').jstree().create_node(this.props.selectedNode, 'New Category');

      // $('#data').jstree().edit(node, undefined, (nodeReceived, status, cancelled) => {
      //   console.log(node)
      //   console.log(nodeReceived)
      //   console.log(status)
      //   if(status) {
      //     this.props.addCategory({ parent_id: parseInt(node.parent), name: node.text })
      //   }
      // });
    }, _this.editNode = function () {
      console.log('edit');
      var nodeToEdit = (0, _jquery2.default)('#data').jstree().get_selected();
      (0, _jquery2.default)('#data').jstree().edit(nodeToEdit);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TreeView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          treeData = _props.treeData,
          onSelect = _props.onSelect,
          addCategory = _props.addCategory,
          editCategory = _props.editCategory;

      var _selectedNodeId = void 0,
          count = 0;
      if (treeData) {
        (0, _jquery2.default)('#data').jstree(treeData).bind('select_node.jstree', onSelect)
        // .bind('create_node.jstree', function(e, data) {
        //   console.log(e);
        //   console.log(data);
        //   const { node } = data;
        //   addCategory({ parent_id: parseInt(node.parent), name: node.text })
        // })
        .bind('rename_node.jstree', function (e, obj) {
          console.log(obj);
          var node = obj.node;

          if (node.id.includes('j')) {
            addCategory(node, { parent_id: parseInt(node.parent), name: node.text });
            // console.log(category);
            // $('#data').jstree(true).set_id(node, category.id);
          } else {
            editCategory(node.id, { parent_id: parseInt(node.parent), name: node.text });
          }
        }).bind('select_node.jstree', function (e, _data) {
          if (_selectedNodeId === _data.node.id) {
            if (count === 1) {
              _data.instance.deselect_node(_data.node);
              _selectedNodeId = "";
              count = 0;
            } else {
              count++;
            }
          } else {
            _selectedNodeId = _data.node.id;
            count = 0;
          }
        }).jstree();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', { id: 'data' }),
        _react2.default.createElement(
          'footer',
          { className: 'button-row middle' },
          _react2.default.createElement(
            'div',
            { className: 'button green', onClick: this.addNode },
            'Add Category'
          ),
          _react2.default.createElement(
            'div',
            { className: 'button blue', onClick: this.editNode },
            'Edit Category'
          )
        )
      );
    }
  }]);

  return TreeView;
}(_react.Component);

TreeView.propTypes = {
  treeData: _react.PropTypes.object.isRequired,
  onSelect: _react.PropTypes.func.isRequired,
  selectedNode: _react.PropTypes.string.isRequired,
  addCategory: _react.PropTypes.func.isRequired,
  editCategory: _react.PropTypes.func.isRequired
};
exports.default = TreeView;