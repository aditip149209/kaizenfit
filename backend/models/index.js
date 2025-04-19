import { sequelize } from "../utils/database.js";
import { DataTypes } from "sequelize";

const Workout = sequelize.define("Workout", {
    PlanID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    CaloriesBurned: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'cardio'
    },
    TargetPart: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'full_body'
    },     
    Day: {
        type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
        allowNull: false,
        defaultValue: 'Monday'
    },
    
})

const DietPlan = sequelize.define("DietPlan", {
    DietPlanID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    GoalType: {
        type: DataTypes.ENUM('weight_loss', 'muscle_gain', 'maintenance'),
        allowNull: false,
        defaultValue: 'maintenance'
    },
    
    CaloriesConsumed: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    CarbsConsumed: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ProteinCOnsumed: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    FatsConsumed: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Type: {
        type: DataTypes.ENUM('vegetarian', 'non_vegetarian', 'vegan', 'keto', 'eggetarian'),
        allowNull: false,
        defaultValue: 'vegetarian'
    }, 
    Day: {
        type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'THrusday', 'Friday', 'Saturday', 'Sunday'),
        allowNull: false,
        defaultValue: 'Monday'
    }
})

const Users = sequelize.define("Users", {
    UserID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Gender: {
        type: DataTypes.ENUM('male', 'female', 'prefernottosay'),
        allowNull: false,
        defaultValue: 'prefernottosay'
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    DateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    FitnessGoal: {
        type: DataTypes.ENUM('weight_loss', 'muscle_gain', 'maintenance'),
        allowNull: false,
        defaultValue: 'maintenance'
    },
    FitnessLevel: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Moderately Active"
    },
    WorkoutPlan: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Workout,
            key: 'PlanID'
        }
    },
    DietPlan: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: DietPlan,
            key: 'DietPlanID'
        }
    },
    Membership: {
        type: DataTypes.ENUM('basic', 'gold', 'platinum'),
        allowNull: false,
        defaultValue: 'basic'
    },
    Height: {
        type: DataTypes.FLOAT,

    },
    StepsGoal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10000,
    },
    SleepGoal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 8,
    },
    WaterIntakeGoal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 8,
    },
    WeightGoal: {
        type: DataTypes.FLOAT,

    },
    isOnboarded: {
        type: DataTypes.BOOLEAN,
        allowNull: false, 
        defaultValue: false
    },
    CalorieGoal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2000
    },
    ProteinGoal : {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 100
    },
    CarbGoal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 150
    },
    FatsGoal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 20
    }
})

const Exercise = sequelize.define("Exercise", {
    ExerciseID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    CaloriesBurned: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'cardio'
    },
    TargetPart: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'full_body'
    } ,
    defaultReps: {
        type: DataTypes.INTEGER,
    },
    defaultSets: {
        type: DataTypes.INTEGER,
    }
})

const FoodItem = sequelize.define("FoodItem", {
    FoodID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Measure: {
        type: DataTypes.ENUM('grams', 'ml', 'pieces'),
        allowNull: false,
        defaultValue: 'grams'
    },
    Protein: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Carbohydrates: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Fats: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Timing: {
        type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'snack'),
        allowNull: false,
        defaultValue: 'snack'
    },
    Quantity: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1,
    },
    Type: {
        type: DataTypes.ENUM('vegetarian', 'non_vegetarian', 'vegan', 'keto', 'eggetarian'),
        allowNull: false,
        defaultValue: 'vegetarian'
    }
})


const HealthMetric = sequelize.define("HealthMetric", {
    MetricID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'UserID'
        }
    },
    Timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    HeartRate: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    Steps: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    Sleep: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }    
})

const Plan = sequelize.define("Plan", {
    PlanID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    Price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    Duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

const Membership = sequelize.define("Membership", {
    MembershipID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'UserID'
        }
    },
    PlanID: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: Plan,
            key: 'PlanID'
        }
    },
    StartDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    EndDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Status: {
        type: DataTypes.ENUM('active', 'inactive', 'expired'),
        allowNull: false,
        defaultValue: 'active'
    }
})

const Payment = sequelize.define("Payment", {
    PaymentID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true,
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'UserID'
        }
    },
    Amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Status: {
        type: DataTypes.ENUM('completed', 'pending', 'failed'),
        allowNull: false,
        defaultValue: 'completed'
    }
})

const DietPlanFoodItem = sequelize.define("DietPlanFoodItem", {
    DietPlanID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: DietPlan,
            key: 'DietPlanID'
        }
    },
    FoodID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: FoodItem,
            key: 'FoodID'
        }
    }
})

const WorkoutExercise = sequelize.define("WorkoutExercise", {
    WorkoutID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Workout,
            key: 'PlanID'
        }
    },
    ExerciseID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Exercise,
            key: 'ExerciseID'
        }
    },
    customReps: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    customSets: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    customDuration: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
});

const LogToday = sequelize.define("LogToday",{
    EntryID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false, 
        autoIncrement: true,
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'UserID'
        }
    },
    Timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
    }
})

const WaterLog = sequelize.define("WaterLog", {
    WaterLogID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'UserID'
        }
    },
    Timestamp: {
        type: DataTypes.DATE,
        allowNull: false, // Timestamp of when the water intake was logged
    },
    Quantity: { // Amount of water consumed in this entry
        type: DataTypes.FLOAT, // Use FLOAT to allow partial values (e.g., 0.5 liters)
        allowNull: false,
    }
});

const WeightLog = sequelize.define("WeightLog",{
    WtLogID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'UserID'
        }
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
})

const SleepLog = sequelize.define("SleepLog",{
    SleepLogID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'UserID'
        }
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Source: {
        type: DataTypes.ENUM('manual', 'automatic'),
        allowNull: false,
        defaultValue: 'manual'
    }
})

const SleepStage = sequelize.define("SleepStage",{
    SleepStageID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    SleepLogID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SleepLog,
            key: 'SleepLogID'
        }
    },
    Stage: {
        type: DataTypes.ENUM('awake', 'light', 'deep', 'REM'),
        allowNull: false,
        defaultValue: 'awake'
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false,
    }
})

//JOIN TABLE for tracking todays food items consumed 

const LogTodayFoodItem = sequelize.define("LogTodayFoodItem", {
    EntryID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: LogToday,
            key: 'EntryID'
        }
    },
    FoodID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: FoodItem,
            key: 'FoodID'
        }
    },
    CustomQuantity: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
   
})

//need a table that just has all the workouts created by the user 



const UserWorkoutLog = sequelize.define("UserWorkoutLog", {
    UserID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Users,
            key: 'UserID'
        }
    },
    WorkoutID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Workout,
            key: 'PlanID'
        }
    },
    Date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
})

//Relationships

//for user 

Users.hasMany(HealthMetric, { foreignKey: 'UserID' , onDelete: "CASCADE"});
HealthMetric.belongsTo(Users, { foreignKey: 'UserID' });

Users.hasMany(Membership, { foreignKey: 'UserID' , onDelete: "CASCADE"});
Membership.belongsTo(Users, { foreignKey: 'UserID' });

Users.hasMany(Payment, { foreignKey: 'UserID' });
Payment.belongsTo(Users, { foreignKey: 'UserID' });

Users.hasMany(Workout, { foreignKey: 'WorkoutPlan' });
Workout.belongsTo(Users, { foreignKey: 'WorkoutPlan' });

Users.hasMany(Workout, {
    foreignKey: 'createdByUserId',
    as: 'customWorkouts',
    sourceKey: 'UserID'
  });
  
  Workout.belongsTo(Users, {
    foreignKey: 'createdByUserId',
    as: 'creator',
    targetKey: 'UserID'
  });

Users.hasMany(DietPlan, { foreignKey: 'DietPlan' });
DietPlan.belongsTo(Users, { foreignKey: 'DietPlan' });

Users.hasMany(WeightLog, { foreignKey: 'UserID' });
WeightLog.belongsTo(Users, { foreignKey: 'UserID' });

Users.hasMany(SleepLog, { foreignKey: 'UserID' });
SleepLog.belongsTo(Users, { foreignKey: 'UserID' });


// A user can have multiple water intake logs
Users.hasMany(WaterLog, { foreignKey: 'UserID', onDelete: 'CASCADE' });
WaterLog.belongsTo(Users, { foreignKey: 'UserID' });

Membership.hasOne(Plan, {foreignKey: 'PlanID'});
Plan.belongsTo(Membership, {foreignKey: 'PlanID'});

//for tracking stages in sleep
SleepLog.hasMany(SleepStage, { foreignKey: 'SleepLogID' });
SleepStage.belongsTo(SleepLog, { foreignKey: 'SleepLogID' });

//tracking todays diet
LogToday.belongsToMany(FoodItem, {
    through: LogTodayFoodItem,
    foreignKey: 'EntryID',
    otherKey: 'FoodID'
})

FoodItem.belongsToMany(LogToday, {
    through: LogTodayFoodItem,
    foreignKey: 'FoodID',
    otherKey: 'EntryID'
})

//for diet plan and food item
DietPlan.belongsToMany(FoodItem, {
    through: DietPlanFoodItem,
    foreignKey: 'DietPlanID',
    otherKey: 'FoodID'
})

FoodItem.belongsToMany(DietPlan, {
    through: DietPlanFoodItem,
    foreignKey: 'FoodID',
    otherKey: 'DietPlanID'
})

//for workout and exercise
Workout.belongsToMany(Exercise, {
    through: WorkoutExercise,
    foreignKey: 'WorkoutID',
    otherKey: 'ExerciseID'
})
Exercise.belongsToMany(Workout, {
    through: WorkoutExercise,
    foreignKey: 'ExerciseID',
    otherKey: 'WorkoutID'
})

Users.belongsToMany(Workout, {
    through: UserWorkoutLog,
    foreignKey: 'UserID',
    otherKey: 'WorkoutID'
})

Workout.belongsToMany(Users, {
    through: UserWorkoutLog,
    foreignKey: 'WorkoutID',
    otherKey: 'UserID'
})

const db = { Users, FoodItem, DietPlan, Workout, Exercise, WaterLog, HealthMetric, Membership,
     Payment, Plan, DietPlanFoodItem, WorkoutExercise, SleepLog, SleepStage, WeightLog, LogToday, UserWorkoutLog, LogTodayFoodItem}; 
export default db;











