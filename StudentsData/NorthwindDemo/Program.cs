using StudentsData;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NorthwindDemo
{
    class Program
    {
        
        static void Main(string[] args)
        {

            NORTHWNDEntities entities = new NORTHWNDEntities();

            //var customers = entities.Customers
            //   .Where(x => x.CustomerID == "1111");

            var customer = entities.Customers.Find("1111");

            //foreach (var customer in customers)
            //{
                Console.WriteLine(customer.CustomerID + "-" + customer.ContactName);
            //}


            //Customer customer = new Customer
            //{
            //    CustomerID = "1111",
            //    ContactName = "Cliff",
            //    City= "Davao",
            //    Country = "Philippines",
            //    CompanyName = "Lean"
            //};
            //try
            //{
            //    entities.Customers.Add(customer);
            //    entities.SaveChanges();
            //}
            //catch (DbEntityValidationException ex)
            //{

            //    throw;
            //}


            Console.ReadLine();

        }
    }
}
