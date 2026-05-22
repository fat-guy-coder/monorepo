# from dataclasses import dataclass


class Cat:
    """示例"""

    name = "orange"

    def __init__(self, age, gender):
        self.age = age
        self.gender = gender

    def bark(self):
        return f"{self.name} say his name is {self.name}"


orange = Cat(10, "male")


class MyCat(Cat):
    """我的小猫"""

    def __init__(self, age, gender):
        super().__init__(age, gender)

    def bark(self):
        return f"{super().bark()},she is my favorbrite pet"


huahua = MyCat(2, "female")

print(huahua.bark())


# @dataclass
# class MyDog:
#     name: str = "aaa"
#     age: int
#     finger: float
#     gender: str

#     def __init__(self, age, finger, gender):
#         self.age = age
#         self.finger = finger
#         self.gender = gender

#     @classmethod
#     def hi(cls, skin):
#         cls.skin = skin


# print(MyDog(10, 3.2, "female"))
