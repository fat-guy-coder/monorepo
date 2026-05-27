list1 = [1, 2, 3]
list2 = [5, 5, 6]
list3 = list1 + list2

print(f"list3 is {list3}")

list3[2:3] = [100, 123]

print(f"list3 is {list3}")


list4 = list(filter(lambda x: x >= 100, list3))

print(f"list4 is {list4}")


def h(x):
    return x**2


list5 = list(map(h, list3))

list2[1:2] = [3, 3]

print(f"list2 is {list2}")
