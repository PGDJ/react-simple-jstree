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
    _classCallCheck(this, TreeView);

    return _possibleConstructorReturn(this, (TreeView.__proto__ || Object.getPrototypeOf(TreeView)).apply(this, arguments));
  }

  _createClass(TreeView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          treeData = _props.treeData,
          onSelect = _props.onSelect,
          addCategory = _props.addCategory,
          editCategory = _props.editCategory,
          deleteCategory = _props.deleteCategory;

      var _selectedNodeId = void 0,
          count = 0;
      if (treeData) {
        (0, _jquery2.default)('#data').jstree(treeData).bind('select_node.jstree', onSelect).bind('create_node.jstree', function (e, data) {
          data.instance.set_icon(data.node, 'fa fa-folder');
        }).bind('rename_node.jstree', function (e, data) {
          var node = data.node;

          if (node.id.includes('j')) {
            addCategory(node, { parent_id: parseInt(node.parent), name: node.text });
          } else {
            editCategory(node.id, { parent_id: parseInt(node.parent), name: node.text });
          }
        }).bind('open_node.jstree', function (e, data) {
          data.instance.set_icon(data.node, 'fa fa-folder-open');
        }).bind('close_node.jstree', function (e, data) {
          data.instance.set_icon(data.node, 'fa fa-folder');
        }).bind('delete_node.jstree', function (e, data) {
          var node = data.node;

          deleteCategory(parseInt(node.id));
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { id: 'data' });
    }
  }]);

  return TreeView;
}(_react.Component);

TreeView.propTypes = {
  treeData: _react.PropTypes.object.isRequired,
  onSelect: _react.PropTypes.func.isRequired,
  selectedNode: _react.PropTypes.string.isRequired,
  addCategory: _react.PropTypes.func.isRequired,
  editCategory: _react.PropTypes.func.isRequired,
  deleteCategory: _react.PropTypes.func.isRequired
};
exports.default = TreeView;