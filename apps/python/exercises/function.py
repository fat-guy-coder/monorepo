a = "b"
b = "b"


def ha(name):
    """文档字符串（可选）"""
    g = a + b + name
    return g


def fun(**arg):
    for k, v in arg.items():
        print(f"{k},{v}")
        # print(type(v))


fun({"ccc": {"haha": "aaa"}, "num": 1, "bol": True, "float": 3.25, "set": {1, 3, 4, 5}})
