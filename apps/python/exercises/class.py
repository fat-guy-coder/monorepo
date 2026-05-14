class Cat:
    """示例"""

    name = "orange"

    def __init__(self, age, gender):
        self.age = age
        self.gender = gender

    def bark(self):
        return f"{self.name} say his name is {self.name}"


orange = Cat(10, "male")

print([x**2 for x in range(5)])
